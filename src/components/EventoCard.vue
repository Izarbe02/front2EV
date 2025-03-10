<script setup lang="ts"> 
import { onMounted, computed } from "vue";
import { useEventosStore } from "@/stores/eventos";
import type EventoDto from "@/stores/dtos/evento.dto";

const eventosStore = useEventosStore();

onMounted(() => {
  eventosStore.findAll();
});
console.log(eventosStore.eventos)
// Computed para definir qué eventos se mostrarán
const eventosMostrados = computed<EventoDto[]>(() => 
  eventosStore.hayEventosFiltrados ? eventosStore.eventosFiltrados : eventosStore.eventos
);

const formatearFecha = (fecha: Date | string) => {
  console.log(fecha) 
  if (!fecha) return "Fecha no disponible";
  const fechaObjeto = fecha instanceof Date ? fecha : new Date(fecha);
  if (isNaN(fechaObjeto.getTime())) return "Fecha inválida"; 

  return fechaObjeto.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};

</script>

<template>
  <div class="evento-container">
    <h1 class="evento-container__titulo">EVENTOS</h1>

    <div class="evento-container__tarjetas">
      <template v-if="eventosMostrados.length > 0">
        <div v-for="evento in eventosMostrados" :key="evento.id" class="evento-card">
          <img :src="evento.enlace" :alt="evento.nombre" class="evento-card__imagen" />

          <div class="evento-card__contenido">
            <p class="evento-card__titulo">{{ evento.nombre }}</p>

            <div class="evento-card__info">
              <span class="evento-card__fecha">
                {{ formatearFecha(evento.fechaInicio) }} -
                 {{ formatearFecha(evento.fechaFin) }}
              </span>
              <span class="evento-card__localizacion">📍 {{ evento.ubicacion }}</span>
            </div>

            <RouterLink :to="`/EventoDetalle?id=${evento.id}`" class="evento-card__boton">
              Saber más
            </RouterLink>
          </div>
        </div>
      </template>

      <div v-else class="evento-container__no-resultados">
        <p>No se encontraron eventos.</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";
@import "@/assets/styles/_mixins.scss";

.evento-container {
  padding: 2%;

  &__titulo {
    @include titulo-evento;
    text-align: center;
    text-shadow: 0px 0px 10px $color-black, 0px 0px 20px $color-black;
    margin-top: 1%;
  }

  &__tarjetas {
    margin-top: 25px;
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr;
    justify-items: center;
    margin-bottom: 30px;
  }

  &__no-resultados {
    text-align: center;
    color: $color-lightgray;
    font-size: 1.2rem;
    margin-top: 20px;
  }

  @media (min-width: 768px) {
    margin-top: 1%;
    
    &__tarjetas {
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
      margin-bottom: 50px;
    }
  }
}

.evento-card {
  height: 600px;
  background: url("@/assets/Images/fondo1.jpg") no-repeat center center;
    background-size: cover;

  border: 2px solid $color-gray;
  border-radius: 8px;
  color: #fff;
  width: 100%;
  max-width: 430px;
  display: flex;
  flex-direction: column; 
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 0px 15px rgba(92, 92, 92, 0.7);
  }

  &__imagen {
    width: 100%;
    height: 50%;
    object-fit: cover;
  }

  &__contenido {
    padding: 12px;
    flex-grow: 1; 
    display: flex;
    flex-direction: column;
  }

  &__titulo {
    font-family: $first-font;
    font-size: 38px;
    text-align: center;
    margin-bottom: 15px;
    color: $color-whitered;
    text-shadow: 2px 2px 5px rgba(255, 5, 5, 0.7);
  }

  &__info {
    margin-left: 10% ;
    font-family: $first-font;
    font-size: 1.3rem;
    color: rgb(199, 199, 199);
    display: flex;
    flex-direction: column;
    gap: 4px;
  
    margin-top: auto; 
  }

  &__boton {
    @include boton-rojo;
    text-decoration: none;
    text-align: center;
    display: block;
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
    transition: background 0.3s ease;
    margin-top: auto; 

    &:hover {
      background-color: $color-lightred;
    }
  }
}

</style>