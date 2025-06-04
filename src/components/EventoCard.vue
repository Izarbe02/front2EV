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

const categorias = ref<{ id: number; nombre: string }[]>([]);
const categoriaSeleccionada = ref<string>("");

onMounted(async () => {
  await eventosStore.findAll();
  await cargarCategorias();
});

const cargarCategorias = async () => {
  try {
    const response = await fetch("http://localhost:8888/api/CategoriaEvento");
    if (!response.ok) throw new Error("Error al obtener categorías");
    categorias.value = await response.json();
  } catch (error: any) {
    console.error("Error cargando categorías:", error);
  }
};

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
  const fechaObj = typeof fecha === "string" ? new Date(fecha) : fecha;
  return fechaObj.toLocaleDateString("es-ES", {
    weekday: "long", day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
  });
};

const filtrarPorRango = async () => {
  if (!fechaInicio.value || !fechaFin.value) {
    alert("Debes seleccionar ambas fechas.");
    return;
  }

  const inicio = new Date(fechaInicio.value);
  inicio.setHours(0, 0, 0, 0);

  const fin = new Date(fechaFin.value);
  fin.setHours(23, 59, 59, 999);

  if (inicio > fin) {
    alert("La fecha de inicio no puede ser posterior a la fecha de fin.");
    return;
  }

  await eventosStore.filtrarPorRangoFechas(inicio, fin);
};

const filtrarPorCategoria = async () => {
  if (!categoriaSeleccionada.value) return;
  await eventosStore.getEventoPorCategoria(categoriaSeleccionada.value);
};

const limpiarFiltro = async () => {
  fechaInicio.value = "";
  fechaFin.value = "";
  categoriaSeleccionada.value = "";


  eventosStore.hayEventosFiltrados = false;
  eventosStore.eventosFiltrados = [];


  await eventosStore.findAll();
};
</script>


<template>
  <div class="evento-container">
    <h1 class="evento-container__titulo">EVENTOS</h1>

    <div class="evento-container__filtro">
      <div class="evento-container__filtro-fechas">
        <label for="fechaInicio" class="evento-container__label">Desde:</label>
        <input type="date" v-model="fechaInicio" class="evento-container__input-fecha" id="fechaInicio" />

        <label for="fechaFin" class="evento-container__label">Hasta:</label>
        <input type="date" v-model="fechaFin" class="evento-container__input-fecha" id="fechaFin" />

        <label for="categoria" class="evento-container__label">Categoría:</label>
<select
  id="categoria"
  v-model="categoriaSeleccionada"
  @change="filtrarPorCategoria"
  class="evento-container__input-fecha"
>
  <option disabled value="">Selecciona una categoría</option>
  <option v-for="cat in categorias" :key="cat.id" :value="cat.nombre">
    {{ cat.nombre }}
  </option>
</select>

      </div>

      <div class="evento-container__filtro-botones">
        <button class="evento-container__boton-filtro" @click="filtrarPorRango">
          Filtrar por fecha
        </button>
        <button class="evento-container__boton-filtro" @click="limpiarFiltro">
          Limpiar filtro
        </button>
      </div>
              <div class="evento-container__tabs">
  <button
    class="evento-container__tab"
    :class="{ 'evento-container__tab--active': !mostrarAcabados }"
    @click="mostrarAcabados = false"
  >
    Actuales
  </button>
  <button
    class="evento-container__tab"
    :class="{ 'evento-container__tab--active': mostrarAcabados }"
    @click="mostrarAcabados = true"
  >
    Acabados
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
              <span class="evento-card__fecha">{{ formatearFecha(evento.fechaInicio) }} - {{ formatearFecha(evento.fechaFin) }}</span>
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
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
  }

  &__filtro-fechas {
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
      gap: 20px;
    }
  }


.evento-container__tab {
  flex: 1;
margin-left: 10px;
  font-family: $first-font;
  font-size: 2.1rem;
  padding: 12px 0;
  background: none;
  border: none;
  color: white;
  position: relative;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: $color-lightred;
  }

  &--active {
    font-weight: bold;
    color: $color-lightred;

    &::after {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 3px;
      background-color: $color-red;
    }
  }
}

  &__filtro-botones {
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: center;
      gap: 15px;
    }
  }

  &__label {
    color: white;
    font-weight: bold;
    font-family: $first-font;
    font-size: 1rem;

    @media (min-width: 768px) {
      font-size: 1.2rem;
    }
  }

  &__input-fecha {
    padding: 6px 10px;
    border: 2px solid $color-red;
    border-radius: 4px;
    font-family: $first-font;
    background-color: white;
    color: $color-black;
    font-size: 0.95rem;

    &:focus {
      outline: none;
      border-color: $color-red;
      box-shadow: 0 0 5px $color-red;
    }

    &::-webkit-calendar-picker-indicator {
      filter: invert(28%) sepia(78%) saturate(6485%) hue-rotate(357deg) brightness(100%) contrast(100%);
    }

    @media (min-width: 768px) {
      font-size: 1.15rem;
      padding: 10px 14px;
    }
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

    @media (min-width: 768px) {
      font-size: 1.1rem;
      padding: 12px 24px;
    }
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
