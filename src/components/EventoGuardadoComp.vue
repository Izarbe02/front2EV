<script setup lang="ts">
  import { onMounted, ref } from "vue";
import { useEventosGuardadosStore } from '@/stores/eventosGuardados'
import { useUsuariosStore } from '@/stores/usuarios'
import type EventoDto from '@/stores/dtos/evento.dto'

const eventosGuardadosStore = useEventosGuardadosStore()
const eventos = ref<EventoDto[]>([])
const store = useUsuariosStore();
console.log(store.usuarioLogeado);


const cargarEventosGuardados = async () => {
  const usuario = store.usuarioLogeado;
  if (!usuario) return;

  await eventosGuardadosStore.cargarEventosGuardados(usuario.id);
  eventos.value = eventosGuardadosStore.eventosGuardados;
};

const quitarEvento = async (idEvento: number) => {
  const usuario = store.usuarioLogeado;
  if (!usuario) return;

  await eventosGuardadosStore.quitarEvento(usuario.id, idEvento);
  await cargarEventosGuardados();
};

</script>

<template>
  <div class="eventos-guardados">
    <h2 class="eventos-guardados__titulo">Mis eventos guardados</h2>
    <div v-if="eventos.length > 0" class="eventos-guardados__lista">
      <div v-for="evento in eventos" :key="evento.id" class="evento">
        <img :src="evento.enlace" alt="Imagen del evento" class="evento__imagen" />
        <div class="evento__contenido">
          <h3 class="evento__nombre">{{ evento.nombre }}</h3>
          <p class="evento__descripcion">{{ evento.descripcion }}</p>
          <p class="evento__fecha">📅 {{ new Date(evento.fechaInicio).toLocaleDateString() }}</p>
          <p class="evento__ubicacion">📍 {{ evento.ubicacion }}</p>
          <button class="evento__boton-quitar" @click="quitarEvento(evento.id)">Quitar de guardados</button>
        </div>
      </div>
    </div>
    <div v-else class="eventos-guardados__vacio">No tienes eventos guardados.</div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/_variables.scss';

.eventos-guardados {
  padding: 1.5rem 1rem;
  color: $color-lightred;

  &__titulo {
    font-family: $titulo;
    font-size: 1.8rem;
    text-align: center;
    margin-bottom: 1.5rem;
  }

  &__lista {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__vacio {
    text-align: center;
    font-family: $first-font;
    font-size: 1rem;
    padding: 2rem;
  }
}

.evento {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background-color: $color-darkgray;
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid $color-lightred;

  &__imagen {
    width: 100%;
    max-height: 180px;
    object-fit: cover;
    border-radius: 5px;
  }

  &__contenido {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__nombre {
    font-family: $first-font;
    font-size: 1.3rem;
    color: $color-red;
  }

  &__descripcion {
    color: white;
    font-family: $first-font;
    font-size: 0.95rem;
  }

  &__fecha,
  &__ubicacion {
    font-family: $first-font;
    color: $color-palidGreen;
    font-size: 0.9rem;
  }

  &__boton-quitar {
    background-color: $color-lightred;
    color: black;
    font-weight: bold;
    padding: 0.4rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-family: $first-font;
    font-size: 0.95rem;
    align-self: flex-start;

    &:hover {
      background-color: $color-red;
      color: white;
    }
  }
}

@media (min-width: 768px) {
  .eventos-guardados__lista {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
  }

  .evento {
    width: calc(50% - 1rem);
  }
}

@media (min-width: 1024px) {
  .evento {
    width: 300px;
  }
}
</style>
