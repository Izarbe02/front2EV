<template>
  <div class="contenido">
    <h1 class="contenido__titulo">EVENTOS</h1>

    <div v-if="rolActual === 1 || rolActual === 2" class="contenido__crear">
      <button class="contenido__crear-boton" @click="mostrarCrear = !mostrarCrear">
        {{ mostrarCrear ? 'Cerrar creación' : 'Crear nuevo evento' }}
      </button>
      <CrearEvento v-if="mostrarCrear" @close="mostrarCrear = false" />
    </div>

    <div class="contenido__tabla-wrapper">
      <table class="contenido__tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Ubicación</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="eventosFiltrados.length === 0">
            <td colspan="7">No tienes eventos disponibles</td>
          </tr>
          <tr v-for="evento in eventosFiltrados" :key="evento.id">
            <td>{{ evento.id }}</td>
            <td>{{ evento.nombre }}</td>
            <td>{{ evento.descripcion }}</td>
            <td>{{ evento.ubicacion }}</td>
            <td>{{ formatearFecha(evento.fechaInicio) }}</td>
            <td>{{ formatearFecha(evento.fechaFin) }}</td>
            <td>
              <button class="contenido__btn contenido__btn--editar" @click="editarEvento(evento)">
                <i class="fas fa-pencil-alt"></i>
              </button>
              <button class="contenido__btn contenido__btn--borrar" @click="borrarEvento(evento.id)">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="eventoEditado" class="modal-overlay">
      <div class="form-tarjeta">
        <button class="form-tarjeta__cerrar" @click="cerrarFormularioEdicion">✕</button>
        <h2 class="form-tarjeta__titulo">Editar evento</h2>

        <div class="form-tarjeta__preview">
          <img v-if="previewUrl" :src="previewUrl" class="form-tarjeta__imagen" />
          <img v-else-if="formEdit.enlace" :src="formEdit.enlace" class="form-tarjeta__imagen" />
          <div v-else class="form-tarjeta__placeholder">Imagen del evento</div>
        </div>

        <form @submit.prevent="guardarCambiosEvento" class="form-tarjeta__form">
          <label class="form-tarjeta__label">Título del evento</label>
          <input v-model="formEdit.nombre" type="text" required class="form-tarjeta__input" />

          <label class="form-tarjeta__label">Descripción</label>
          <textarea v-model="formEdit.descripcion" required class="form-tarjeta__textarea"></textarea>

          <label class="form-tarjeta__label">Ubicación</label>
          <input v-model="formEdit.ubicacion" type="text" required class="form-tarjeta__input" />

          <div class="form-tarjeta__fechas">
            <div class="form-tarjeta__grupo">
              <label class="form-tarjeta__label">Fecha de inicio</label>
              <input v-model="formEdit.fechaInicio" type="datetime-local" required class="form-tarjeta__input" />
            </div>
            <div class="form-tarjeta__grupo">
              <label class="form-tarjeta__label">Fecha de fin</label>
              <input v-model="formEdit.fechaFin" type="datetime-local" required class="form-tarjeta__input" />
            </div>
          </div>

          <label class="form-tarjeta__label">Imagen</label>
          <input type="file" @change="seleccionarNuevaImagen" accept="image/*" class="form-tarjeta__input" />

          <button type="submit" class="form-tarjeta__boton">Guardar cambios</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, watchEffect } from "vue";
import { useEventosStore } from "@/stores/eventos";
import { useUsuariosStore } from "@/stores/usuarios";
import { useOrganizadoresStore } from "@/stores/organizadores";
import type EventoDto from "@/stores/dtos/evento.dto";
import CrearEvento from "@/components/CrearEvento.vue";

const store = useEventosStore();
const { eventos, findAll, deleteEvento, updateEventoConImagen } = store;

const usuariosStore = useUsuariosStore();
const organizadoresStore = useOrganizadoresStore();

const eventoEditado = ref<EventoDto | null>(null);
const mostrarCrear = ref(false);

const idOrganizadorLogeado = computed(() => organizadoresStore.organizadorLogeado?.id ?? null);
const rolActual = computed(() =>
  usuariosStore.usuarioLogeado?.idRol ?? organizadoresStore.organizadorLogeado?.idRol ?? -1
);

const eventosFiltrados = computed(() => {
  const rol = rolActual.value;
  const idOrg = idOrganizadorLogeado.value;
  if (rol === 1) return eventos;
  if (rol === 2 && idOrg !== null) return eventos.filter(e => e.idOrganizador === idOrg);
  return [];
});

onMounted(async () => {
  await findAll();
});

watchEffect(() => {
  const raw = localStorage.getItem("organizadorLogeado");
  if (raw && raw !== "undefined" && !organizadoresStore.organizadorLogeado) {
    try {
      organizadoresStore.organizadorLogeado = JSON.parse(raw);
    } catch (e) {
      console.warn("No se pudo parsear organizadorLogeado:", e);
    }
  }
});

const previewUrl = ref<string | null>(null);
const fileEdit = ref<File | null>(null);
const formEdit = ref({
  nombre: "",
  descripcion: "",
  ubicacion: "",
  fechaInicio: "",
  fechaFin: "",
  enlace: "",
});

const editarEvento = (evento: EventoDto) => {
  eventoEditado.value = evento;
  fileEdit.value = null;
  previewUrl.value = null;

  formEdit.value = {
    nombre: evento.nombre,
    descripcion: evento.descripcion,
    ubicacion: evento.ubicacion,
    fechaInicio: new Date(evento.fechaInicio).toISOString().slice(0, 16),
    fechaFin: new Date(evento.fechaFin).toISOString().slice(0, 16),
    enlace: evento.enlace ?? "",
  };
};

const seleccionarNuevaImagen = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files?.[0]) {
    fileEdit.value = target.files[0];
    previewUrl.value = URL.createObjectURL(fileEdit.value);
  }
};

const guardarCambiosEvento = async () => {
  if (!eventoEditado.value) return;

  const formData = new FormData();
  formData.append("idOrganizador", String(idOrganizadorLogeado.value));
  formData.append("nombre", formEdit.value.nombre);
  formData.append("descripcion", formEdit.value.descripcion);
  formData.append("ubicacion", formEdit.value.ubicacion);
  formData.append("fechaInicio", new Date(formEdit.value.fechaInicio).toISOString());
  formData.append("fechaFin", new Date(formEdit.value.fechaFin).toISOString());
  formData.append("enlace", formEdit.value.enlace || "");

  if (fileEdit.value) {
    formData.append("file", fileEdit.value);
  }

  await updateEventoConImagen(eventoEditado.value.id, formData);
  await findAll();
  cerrarFormularioEdicion();
};

const cerrarFormularioEdicion = () => {
  eventoEditado.value = null;
  formEdit.value = {
    nombre: "",
    descripcion: "",
    ubicacion: "",
    fechaInicio: "",
    fechaFin: "",
    enlace: "",
  };
  fileEdit.value = null;
  previewUrl.value = null;
};

const borrarEvento = async (id: number) => {
  if (confirm("¿Estás seguro de que quieres eliminar este evento?")) {
    await deleteEvento(id);
  }
};

const formatearFecha = (fecha: Date | string): string => {
  const f = typeof fecha === "string" ? new Date(fecha) : fecha;
  return f.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "2-digit",
    month: "short",
  });
};
</script>


<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";
@import "@/assets/styles/_mixins.scss";

.contenido {
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 10px;
  background-color: $color-darkgray;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__titulo {
    font-family: $titulo;
    font-size: 1.8rem;
    font-weight: bold;
    color: $color-red;
    text-align: center;
    margin-bottom: 1rem;
  }

  &__crear {
    width: 100%;
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    &-boton {
      background-color: $color-darkGreen;
      color: white;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 6px;
      font-weight: bold;
      font-family: $first-font;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;

      &:hover {
        background-color: $color-green;
        color: $color-black;
      }
    }
  }

  &__tabla-wrapper {
    width: 100%;
    overflow-x: auto;

    @media (min-width: 768px) {
      overflow-x: visible;
    }
  }

  &__tabla {
    width: 100%;
    min-width: 600px;
    border-collapse: collapse;
    color: white;
    font-size: 0.9rem;

    th,
    td {
      padding: 0.75rem 1rem;
      text-align: left;
      border-bottom: 1px solid $color-lightgray;
    }

    th {
      background-color: $color-lightgray;
      font-weight: bold;
      color: white;
    }

    &-acciones {
      display: flex;
      gap: 0.5rem;
    }
  }

  &__btn {
    border: none;
    border-radius: 6px;
    padding: 0.4rem 0.6rem;
    font-size: 1rem;
    font-weight: bold;
    font-family: $first-font;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &--editar {
      background-color: $color-lightgray;
      color: white;

      &:hover {
        background-color: lighten($color-lightgray, 8%);
      }
    }

    &--borrar {
      background-color: $color-red;
      color: white;

      &:hover {
        background-color: $color-lightred;
      }
    }
  }
}

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

  @media (min-width: 768px) {
    .form-tarjeta {
      padding: 2rem;
      max-width: 600px;
    }
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
    object-fit: cover;
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

  &__fechas {
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

@media (min-width: 768px) {
  .contenido {
    padding: 2rem;

    &__titulo {
      font-size: 2.4rem;
    }

    &__tabla {
      font-size: 1rem;
    }
  }

  .form-tarjeta {
    padding: 2rem;

    &__titulo {
      font-size: 1.8rem;
    }

    &__label {
      font-size: 1.1rem;
    }

    &__input,
    &__textarea {
      font-size: 1.1rem;
    }
  }
}
</style>
