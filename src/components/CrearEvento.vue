<template>
  <div class="modal-overlay">
    <div class="form-tarjeta">
      <button class="form-tarjeta__cerrar" @click="$emit('close')">✕</button>
      <h2 class="form-tarjeta__titulo">Crea tu evento</h2>

      <div class="form-tarjeta__preview">
        <img
          v-if="previewUrl"
          :src="previewUrl"
          alt="Vista previa del evento"
          class="form-tarjeta__imagen"
        />
        <div v-else class="form-tarjeta__placeholder">Imagen del evento</div>
      </div>

      <form @submit.prevent="enviarFormulario" class="form-tarjeta__form">
        <label class="form-tarjeta__label">Título del evento</label>
        <input v-model="form.nombre" type="text" required class="form-tarjeta__input" />

        <label class="form-tarjeta__label">Descripción</label>
        <textarea v-model="form.descripcion" required class="form-tarjeta__textarea"></textarea>

        <label class="form-tarjeta__label">Ubicación</label>
        <input v-model="form.ubicacion" type="text" required class="form-tarjeta__input" />

        <div class="form-tarjeta__fechas">
          <div class="form-tarjeta__grupo">
            <label class="form-tarjeta__label">Fecha de inicio</label>
            <input v-model="form.fechaInicio" type="datetime-local" required class="form-tarjeta__input" />
          </div>
          <div class="form-tarjeta__grupo">
            <label class="form-tarjeta__label">Fecha de fin</label>
            <input v-model="form.fechaFin" type="datetime-local" required class="form-tarjeta__input" />
          </div>
        </div>

        <label class="form-tarjeta__label">Imagen</label>
        <input type="file" @change="seleccionarArchivo" accept="image/*" class="form-tarjeta__input" />

        <div class="form-tarjeta__grupo">
          <label class="form-tarjeta__label">Temática</label>
          <select v-model="form.idTematica" class="form-tarjeta__input">
            <option disabled :value="null">Selecciona una temática</option>
            <option v-for="tem in tematicas" :key="tem.id" :value="tem.id">{{ tem.nombre }}</option>
          </select>
        </div>

        <div class="form-tarjeta__grupo">
          <label class="form-tarjeta__label">Categoría</label>
          <select v-model="form.idCategoria" class="form-tarjeta__input">
            <option disabled :value="null">Selecciona una categoría</option>
            <option v-for="cat in categorias" :key="cat.id" :value="cat.id">{{ cat.nombre }}</option>
          </select>
        </div>


        <button type="submit" class="form-tarjeta__boton">Crear evento</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useEventosStore } from "@/stores/eventos";
import type OrganizadorDto from "@/stores/dtos/organizador.dto";
import { onMounted } from "vue";

const categorias = ref<{ id: number; nombre: string }[]>([]);
const tematicas = ref<{ id: number; nombre: string }[]>([]);

onMounted(() => {
  fetch("https://zaragozaconectaapi.retocsv.es/api/CategoriaEvento")
    .then(res => res.json())
    .then(data => categorias.value = data);

  fetch("https://zaragozaconectaapi.retocsv.es/api/Tematica")
    .then(res => res.json())
    .then(data => tematicas.value = data);
});


const eventosStore = useEventosStore();
const { crearEvento } = eventosStore;

let organizadorLogeado: OrganizadorDto | null = null;
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
  idTematica: 0,
  idCategoria: 0,
  enlace: "https://mi-plataforma.com/evento-privado",
});

const file = ref<File | null>(null);
const previewUrl = ref<string | null>(null);

function seleccionarArchivo(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    file.value = target.files[0];
    previewUrl.value = URL.createObjectURL(file.value);
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
  formData.append("enlace", form.value.enlace);
  try {
    await crearEvento(formData);
    alert("Evento creado correctamente");

  form.value = {
    nombre: "",
    descripcion: "",
    ubicacion: "",
    fechaInicio: "",
    fechaFin: "",
    idTematica: 0,
    idCategoria: 0,
    enlace: "https://mi-plataforma.com/evento-privado", // o una cadena vacía si lo prefieres
  };

    file.value = null;
    previewUrl.value = null;
  } catch (err) {
    alert("Error al crear el evento: " + err);
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";

.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
}

.form-tarjeta {
  background: $color-darkgray;
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  color: white;
  font-family: $first-font;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
  max-height: 95vh;
  overflow-y: auto;
  position: relative;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &__cerrar {
    position: absolute;
    top: 12px;
    right: 12px;
    background: none;
    border: none;
    color: white;
    font-size: 1.4rem;
    cursor: pointer;
    font-weight: bold;

    &:hover {
      color: $color-lightred;
    }
  }

  &__titulo {
    text-align: center;
    font-size: 1.9rem;
    color: $color-red;
    margin-bottom: 1rem;
  }

  &__preview {
    width: 100%;
    height: 200px;
    background: $color-black;
    border: 2px dashed $color-lightgray;
    border-radius: 6px;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__imagen {
    max-height: 100%;
    max-width: 100%;
    object-fit:cover;
    border-radius: 6px;
  }

  &__placeholder {
    color: $color-lightgray;
    font-style: italic;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__label {
    font-weight: bold;
    color: $color-lightgray;
    font-size: 1.05rem;
  }

  &__input,
  &__textarea {
    padding: 0.7rem;
    border: none;
    border-radius: 5px;
    background-color: $color-lightgray;
    color: white;
    font-family: $first-font;
    font-size: 1.05rem;
  }

  &__textarea {
    resize: vertical;
    min-height: 80px;
  }

  &__fechas,
  &__extras {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  &__grupo {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  &__boton {
    background-color: $color-red;
    color: white;
    font-weight: bold;
    padding: 0.9rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1.05rem;
    transition: background-color 0.3s;

    &:hover {
      background-color: $color-lightred;
    }
  }
}
</style>
