<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useEventosGuardadosStore } from '@/stores/eventosGuardados'
import type EventoDto from '@/stores/dtos/'

const props = defineProps<{ idUsuario: number }>()
const eventosGuardadosStore = useEventosGuardadosStore()
const eventos = ref<EventoDto[]>([])

const cargarEventosGuardados = async () => {
  eventos.value = await eventosGuardadosStore.obtenerEventosGuardados(props.idUsuario)
}

const quitarEvento = async (idEvento: number) => {
  await eventosGuardadosStore.quitarEvento(props.idUsuario, idEvento)
  await cargarEventosGuardados()
}

onMounted(() => {
  cargarEventosGuardados()
})
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
  padding: 2rem;
  color: $color-lightred;

  &__titulo {
    font-family: $titulo;
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
  }

  &__lista {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  &__vacio {
    text-align: center;
    font-family: $first-font;
    font-size: 1.2rem;
  }
}

.evento {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: $color-darkgray;
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid $color-lightred;

  &__imagen {
    width: 100%;
    border-radius: 5px;
  }

  &__contenido {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__nombre {
    font-family: $first-font;
    font-size: 1.5rem;
    color: $color-red;
  }

  &__descripcion {
    color: white;
    font-family: $first-font;
  }

  &__fecha,
  &__ubicacion {
    font-family: $first-font;
    color: $color-palidGreen;
  }

  &__boton-quitar {
    background-color: $color-lightred;
    color: black;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-family: $first-font;

    &:hover {
      background-color: $color-red;
      color: white;
    }
  }
}
</style>