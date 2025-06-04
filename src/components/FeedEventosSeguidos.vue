<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useUsuariosStore } from '@/stores/usuarios';
import type EventoDto from '@/stores/dtos/evento.dto';
import { useRouter } from 'vue-router';

const store = useUsuariosStore();
const usuario = computed(() => store.usuarioLogeado);
const eventosRecientesSeguidos = ref<EventoDto[]>([]);
const router = useRouter();

const cargarEventosRecientesSeguidos = async (idUsuario: number) => {
  try {
    const res = await fetch(`http://localhost:8888/api/UsuarioOrganizador/eventos-recientes/${idUsuario}`);
    if (res.ok) {
      eventosRecientesSeguidos.value = await res.json();
    }
  } catch (error) {
    console.error("Error al cargar eventos recientes seguidos:", error);
  }
};

onMounted(() => {
  if (usuario.value?.id) {
    cargarEventosRecientesSeguidos(usuario.value.id);
  }
});
</script>

<template>
  <div class="feed">
    <h2 class="feed__titulo">Novedades de organizadores</h2>

    <div v-if="eventosRecientesSeguidos.length === 0" class="feed__vacio">
      No hay novedades recientes.
    </div>

    <div v-else class="feed__lista">
      <div v-for="evento in eventosRecientesSeguidos" :key="evento.id" class="feed__card">
        <img :src="evento.enlace" alt="Imagen evento" class="feed__imagen" />
        <div class="feed__contenido">
          <h3 class="feed__nombre">{{ evento.nombre }}</h3>
          <p class="feed__descripcion">{{ evento.descripcion }}</p>
          <p class="feed__fecha">📅 {{ new Date(evento.fechaInicio).toLocaleDateString() }}</p>
          <div class="evento-detalle__lugar">
            📍 {{ evento.ubicacion }}
            <RouterLink
              :to="`/OrganizadorDetalle?id=${evento.idOrganizador}`"
              class="evento-detalle__direccion"
            >
              {{ evento.fechaFin }}
            </RouterLink>
          </div>

          <button class="feed__boton" @click="router.push(`/EventoDetalle?id=${evento.id}`)">
            Ver evento
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/_variables.scss';

.feed {
  padding: 1.5rem 1rem;
  color: $color-lightred;
  text-align: center;

  &__titulo {
    font-family: $titulo;
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  &__vacio {
    font-family: $first-font;
    font-size: 1rem;
    color: $color-lightgray;
  }

  &__lista {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__card {
    background-color: $color-darkgray;
    padding: 1rem;
    border-radius: 10px;
    border: 1px solid $color-lightred;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__imagen {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 5px;
  }

  &__contenido {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__nombre {
    font-family: $titulo;
    font-size: 1.4rem;
    color: $color-red;
  }

  &__descripcion {
    font-family: $first-font;
    font-size: 1rem;
    color: white;
  }

  &__fecha,
  &__ubicacion {
    font-family: $first-font;
    font-size: 0.95rem;
    color: $color-palidGreen;
  }

  &__boton {
    align-self: center;
    font-family: $first-font;
    background-color: $color-lightred;
    color: black;
    font-weight: bold;
    padding: 0.5rem 1.2rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: $color-red;
      color: white;
      box-shadow: 0 0 10px $color-lightred;
    }
  }
}

@media (min-width: 768px) {
  .feed__lista {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .feed__card {
    width: calc(50% - 1rem);
  }
}

@media (min-width: 1024px) {
  .feed__card {
    width: 300px;
  }
}
</style>
