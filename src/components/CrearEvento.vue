<template>
  <div class="crear-evento">
    <h2 class="crear-evento__titulo">Crear nuevo evento</h2>
    <form @submit.prevent="enviarFormulario" class="crear-evento__form">
      <div class="crear-evento__grupo">
        <label class="crear-evento__label" for="nombre">Nombre</label>
        <input v-model="form.nombre" id="nombre" required class="crear-evento__input" />
      </div>

      <div class="crear-evento__grupo">
        <label class="crear-evento__label" for="descripcion">Descripción</label>
        <textarea v-model="form.descripcion" id="descripcion" required class="crear-evento__input"></textarea>
      </div>

      <div class="crear-evento__grupo">
        <label class="crear-evento__label" for="ubicacion">Ubicación</label>
        <input v-model="form.ubicacion" id="ubicacion" required class="crear-evento__input" />
      </div>

      <div class="crear-evento__grupo">
        <label class="crear-evento__label" for="fechaInicio">Fecha Inicio</label>
        <input type="datetime-local" v-model="form.fechaInicio" id="fechaInicio" required class="crear-evento__input" />
      </div>

      <div class="crear-evento__grupo">
        <label class="crear-evento__label" for="fechaFin">Fecha Fin</label>
        <input type="datetime-local" v-model="form.fechaFin" id="fechaFin" required class="crear-evento__input" />
      </div>

      <div class="crear-evento__grupo">
        <label class="crear-evento__label" for="idTematica">ID Temática</label>
        <input type="number" v-model.number="form.idTematica" id="idTematica" class="crear-evento__input" />
      </div>

      <div class="crear-evento__grupo">
        <label class="crear-evento__label" for="idCategoria">ID Categoría</label>
        <input type="number" v-model.number="form.idCategoria" id="idCategoria" class="crear-evento__input" />
      </div>

      <div class="crear-evento__grupo">
        <label class="crear-evento__label" for="imagen">Imagen</label>
        <input type="file" @change="seleccionarArchivo" accept="image/*" required class="crear-evento__input" />
      </div>

      <button type="submit" class="crear-evento__boton">Crear Evento</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useEventosStore } from "@/stores/eventos";


const eventosStore = useEventosStore();
const { crearEvento } = eventosStore;


let organizadorLogeado = null;
try {
  const raw = localStorage.getItem("organizadorLogeado");
  if (raw && raw !== "undefined") {
    organizadorLogeado = JSON.parse(raw);
  }
} catch (e) {
  console.warn("No se pudo cargar el organizador desde localStorage", e);
}

const form = ref({
  nombre: "",
  descripcion: "",
  ubicacion: "",
  fechaInicio: "",
  fechaFin: "",
  idTematica: null,
  idCategoria: null
});

const file = ref<File | null>(null);

function seleccionarArchivo(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    file.value = target.files[0];
  }
}

async function enviarFormulario() {
  if (!organizadorLogeado?.id) {
    alert("Debes iniciar sesión como organizador para crear un evento.");
    return;
  }

  if (!file.value) {
    alert("Debes seleccionar una imagen.");
    return;
  }

  const formData = new FormData();
  formData.append("nombre", form.value.nombre);
  formData.append("descripcion", form.value.descripcion);
  formData.append("ubicacion", form.value.ubicacion);
  formData.append("fechaInicio", new Date(form.value.fechaInicio).toISOString());
  formData.append("fechaFin", new Date(form.value.fechaFin).toISOString());
  formData.append("idOrganizador", organizadorLogeado.id.toString());
  formData.append("file", file.value);

  if (form.value.idTematica !== null) {
    formData.append("idTematica", form.value.idTematica.toString());
  }

  if (form.value.idCategoria !== null) {
    formData.append("idCategoria", form.value.idCategoria.toString());
  }

  try {
    await crearEvento(formData);
    alert("Evento creado correctamente");

    // Limpiar formulario
    form.value = {
      nombre: "",
      descripcion: "",
      ubicacion: "",
      fechaInicio: "",
      fechaFin: "",
      idTematica: null,
      idCategoria: null
    };
    file.value = null;
  } catch (err: any) {
    alert("Error al crear el evento: " + err.message);
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";

.crear-evento {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 1rem;

  &__titulo {
    text-align: center;
    color: $color-red;
    font-size: 1.6rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__grupo {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  &__label {
    font-weight: bold;
    color: $color-lightgray;
    font-size: 0.95rem;
  }

  &__input {
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid $color-lightgray;
    font-family: $first-font;
    background-color: white;
    color: $color-black;
    font-size: 1rem;
  }

  &__input:focus {
    outline: 2px solid $color-red;
  }

  &__boton {
    background-color: $color-red;
    color: white;
    padding: 0.75rem 1rem;
    font-weight: bold;
    font-family: $first-font;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: $color-lightred;
    }
  }
}

@media (min-width: 768px) {
  .crear-evento {
    padding: 2rem;

    &__titulo {
      font-size: 2rem;
    }

    &__label {
      font-size: 1rem;
    }

    &__input {
      font-size: 1.05rem;
    }
  }
}
</style>
