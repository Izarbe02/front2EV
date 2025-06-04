<template>
  <div class="contenido">
    <h1 class="contenido__titulo">EVENTOS</h1>

    <div v-if="rolActual === 1 || rolActual === 2" class="contenido__crear">
      <button class="contenido__crear-boton" @click="mostrarCrear = !mostrarCrear">
        {{ mostrarCrear ? 'Cerrar creación' : 'Crear nuevo evento' }}
      </button>
      <CrearEvento v-if="mostrarCrear" @close="mostrarCrear = false" />

    </div>

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

    <div v-if="eventoEditado" class="contenido__modal">
      <h3 class="contenido__modal-titulo">Editar Evento</h3>
      <div class="contenido__modal-campo">
        <span class="contenido__modal-label">Nombre:</span>
        <span>{{ eventoEditado.nombre }}</span>
      </div>
      <div class="contenido__modal-campo">
        <span class="contenido__modal-label">Ubicación:</span>
        <span>{{ eventoEditado.ubicacion }}</span>
      </div>
      <button class="contenido__modal-boton" @click="cerrarEdicion">Cerrar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watchEffect, defineAsyncComponent } from "vue";
import { useEventosStore } from "@/stores/eventos";
import { useUsuariosStore } from "@/stores/usuarios";
import { useOrganizadoresStore } from "@/stores/organizadores";
import type EventoDto from "@/stores/dtos/evento.dto";

const CrearEvento = defineAsyncComponent(() => import("@/components/CrearEvento.vue"));


const store = useEventosStore();
const { eventos, findAll, deleteEvento } = store;

const usuariosStore = useUsuariosStore();
const organizadoresStore = useOrganizadoresStore();

const eventoEditado = ref<EventoDto | null>(null);
const mostrarCrear = ref(false);

const idOrganizadorLogeado = computed(() => organizadoresStore.organizadorLogeado?.id ?? null);
const rolActual = computed(() =>
  usuariosStore.usuarioLogeado?.idRol ?? organizadoresStore.organizadorLogeado?.idRol ?? -1
);

const eventosFiltrados = computed(() => {
  const lista = eventos ?? [];
  const rol = rolActual.value;
  const idOrg = idOrganizadorLogeado.value;

  if (rol === 1) return lista;
  if (rol === 2 && idOrg !== null) {
    return lista.filter(e => e.idOrganizador === idOrg);
  }
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

const editarEvento = (evento: EventoDto) => {
  eventoEditado.value = evento;
};

const cerrarEdicion = () => {
  eventoEditado.value = null;
};

const formatearFecha = (fecha: Date | string): string => {
  const fechaObjeto = fecha instanceof Date ? fecha : new Date(fecha);
  return fechaObjeto.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "2-digit",
    month: "short",
  });
};

const borrarEvento = async (id: number) => {
  if (confirm("¿Estás seguro de que quieres eliminar este evento?")) {
    await deleteEvento(id);
  }
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

  &__tabla {
    width: 100%;
    overflow-x: auto;
    color: white;
    font-size: 0.9rem;

    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 600px;
    }

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

  &__modal {
    margin-top: 2rem;
    background: $color-whitered;
    padding: 1.5rem;
    border-radius: 10px;
    color: $color-black;
    width: 100%;
    max-width: 500px;
    margin-inline: auto;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &-titulo {
      font-size: 1.5rem;
      font-weight: bold;
      color: $color-red;
      text-align: center;
    }

    &-campo {
      display: flex;
      justify-content: space-between;
      font-size: 1.1rem;
      flex-wrap: wrap;

      span {
        word-break: break-word;
      }
    }

    &-label {
      font-weight: bold;
      color: $color-darkgray;
      margin-right: 0.5rem;
    }

    &-boton {
      align-self: center;
      background-color: $color-red;
      color: white;
      padding: 0.6rem 1.2rem;
      border: none;
      border-radius: 6px;
      font-weight: bold;
      font-family: $first-font;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;

      &:hover {
        background-color: $color-lightred;
      }
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

    &__modal {
      padding: 2rem;

      &-titulo {
        font-size: 1.8rem;
      }

      &-campo {
        font-size: 1.2rem;
      }
    }
  }
}
</style>
