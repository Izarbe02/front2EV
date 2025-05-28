
<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useUsuariosOrganizadoresStore } from '@/stores/UsuarioOrganizador';
import { useUsuariosStore } from '@/stores/usuarios';
import type EventoDto from '@/stores/dtos/evento.dto';
import { useEventosStore } from '@/stores/eventos';

const usuariosStore = useUsuariosStore();
const usuariosOrganizadoresStore = useUsuariosOrganizadoresStore();
const eventosStore = useEventosStore();

const usuario = computed(() => usuariosStore.usuarioLogeado);
const feedEventos = ref<EventoDto[]>([]);

const cargarFeed = async () => {
  if (usuario.value?.id) {
    feedEventos.value = await usuariosOrganizadoresStore.getEventosSeguidosDesdeFecha(usuario.value.id);
  }
};

onMounted(() => {
  cargarFeed();
});
</script>

<template>
  <div class="feed">
    <h2 class="feed__titulo">Novedades de tus organizadores</h2>

    <div v-if="feedEventos.length === 0" class="feed__vacio">
      No hay nuevos eventos desde que comenzaste a seguir a los organizadores.
    </div>

    <div v-else class="feed__lista">
      <div v-for="evento in feedEventos" :key="evento.id" class="feed__evento">
        <img :src="evento.enlace" alt="imagen evento" class="feed__imagen" />
        <div class="feed__contenido">
          <RouterLink :to="`/EventoDetalle?id=${evento.id}`" class="feed__nombre">
            {{ evento.nombre }}
          </RouterLink>
          <p class="feed__descripcion">{{ evento.descripcion }}</p>
          <p class="feed__fecha">📅 {{ new Date(evento.fechaInicio).toLocaleDateString() }}</p>
          <p class="feed__ubicacion">📍 {{ evento.ubicacion }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/_variables.scss';

.feed {
  padding: 2rem 1rem;

  &__titulo {
    font-family: $titulo;
    font-size: 1.8rem;
    text-align: center;
    color: $color-lightred;
    margin-bottom: 1.5rem;
  }

  &__vacio {
    font-family: $first-font;
    color: $color-lightgray;
    text-align: center;
    font-size: 1rem;
  }

  &__lista {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__evento {
    background-color: $color-darkgray;
    border-radius: 10px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border: 1px solid $color-lightred;
  }

  &__imagen {
    width: 100%;
    max-height: 180px;
    object-fit: cover;
    border-radius: 6px;
  }

  &__contenido {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    color: white;
  }

  &__nombre {
    font-family: $titulo;
    font-size: 1.3rem;
    color: $color-red;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  &__descripcion {
    font-family: $first-font;
    color: white;
    font-size: 1rem;
  }

  &__fecha,
  &__ubicacion {
    font-family: $first-font;
    font-size: 0.95rem;
    color: $color-palidGreen;
  }
}

@media (min-width: 768px) {
  .feed__lista {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .feed__evento {
    width: 300px;
  }
}
</style>
