<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useEventosStore } from "@/stores/eventos";
import type EventoDto from "@/stores/dtos/evento.dto";
import { RouterLink } from "vue-router";

const eventosStore = useEventosStore();
const mostrarAcabados = ref(false);

const fechaInicio = ref("");
const fechaFin = ref("");
const fechaActual = new Date();
console.log(fechaActual);
console.log(fechaFin);



onMounted(() => {
  eventosStore.findAll();
});

const eventosMostrados = computed<EventoDto[]>(() => {
  const base = eventosStore.hayEventosFiltrados
    ? eventosStore.eventosFiltrados
    : eventosStore.eventos;

  return base.filter(evento =>
    mostrarAcabados.value
      ? new Date(evento.fechaFin) < new Date()
      : new Date(evento.fechaFin) >= new Date()
  );
});

const formatearFecha = (fecha: Date | string) => {
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

const filtrarPorRango = async () => {
  if (!fechaInicio.value || !fechaFin.value) {
    alert("Debes seleccionar ambas fechas.");
    return;
  }

  const inicio = new Date(fechaInicio.value);
  const fin = new Date(fechaFin.value);

  if (inicio > fin) {
    alert("La fecha de inicio no puede ser posterior a la fecha de fin.");
    return;
  }
console.log(fin, inicio);

  await eventosStore.filtrarPorRangoFechas(inicio, fin);
};

const limpiarFiltro = async () => {
  fechaInicio.value = "";
  fechaFin.value = "";
  await eventosStore.findAll();
};
</script>

<template>
  <div class="evento-container">
    <h1 class="evento-container__titulo">EVENTOS</h1>

    <div class="evento-container__filtro">
  <div class="evento-container__filtro-fechas">
    <label for="fechaInicio" class="evento-container__label">Desde:</label>
    <input type="datetime-local" v-model="fechaInicio" class="evento-container__input-fecha" id="fechaInicio" />

    <label for="fechaFin" class="evento-container__label">Hasta:</label>
    <input type="datetime-local" v-model="fechaFin" class="evento-container__input-fecha" id="fechaFin" />
  </div>

  <div class="evento-container__filtro-botones">
    <button class="evento-container__boton-filtro" @click="filtrarPorRango">
      Filtrar por fecha
    </button>
    <button class="evento-container__boton-filtro" @click="limpiarFiltro">
      Limpiar filtro
    </button>
    <button class="evento-container__boton-filtro" @click="mostrarAcabados = !mostrarAcabados">
      {{ mostrarAcabados ? 'Ver eventos activos' : 'Ver eventos acabados' }}
    </button>
  </div>
</div>


    <div class="evento-container__tarjetas">
      <template v-if="eventosMostrados.length > 0">
        <div v-for="evento in eventosMostrados" :key="evento.id" class="evento-card">
          <div class="evento-card__imagen-container">
            <img :src="evento.enlace" :alt="evento.nombre" class="evento-card__imagen" />
            <div v-if="new Date(evento.fechaFin) < fechaActual" class="evento-card__acabado">
              <h3>Acabado</h3>
            </div>
          </div>

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

  &__filtro {
    margin-bottom: 20px;
    text-align: center;
  }

  &__boton-filtro {
    background-color: $color-lightred;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: darken($color-lightred, 10%);
    }
  }

  &__input-fecha {
    padding: 6px;
    margin: 0 10px;
    border: 1px solid gray;
    border-radius: 4px;
    font-family: $first-font;
    background-color: white;
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

  &__imagen-container {
    position: relative;
    width: 100%;
    height: 50%;
  }

  &__imagen {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__acabado {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(255, 0, 0, 0.8);
    color: white;
    padding: 5px 10px;
    font-size: 0.9rem;
    font-weight: bold;
    border-radius: 3px;
    text-transform: uppercase;
    font-family: $first-font;
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
    margin-left: 10%;
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
