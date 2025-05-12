<template>
  <v-container class="calendario">
    <v-row justify="space-around">
      <v-date-picker
        v-model="date"
        :allowed-dates="allowedDates"
        @update:model-value="filtrarEventos"
      ></v-date-picker>
    </v-row>

    <div class="calendario__eventos" v-if="eventosSeleccionados.length > 0">
      <h3 class="calendario__titulo-eventos">Eventos para la fecha seleccionada</h3>

      <div class="calendario__cards">
        <div
          v-for="evento in eventosSeleccionados"
          :key="evento.id"
          class="evento-card"
        >
          <div class="evento-card__imagen-container">
            <img :src="evento.enlace" :alt="evento.nombre" class="evento-card__imagen" />
            <div
              v-if="new Date(evento.fechaFin) < fechaActual"
              class="evento-card__acabado"
            >
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

            <RouterLink
              :to="`/EventoDetalle?id=${evento.id}`"
              class="evento-card__boton"
            >
              Saber más
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <v-row v-else>
      <v-col cols="12" class="calendario__sin-eventos">
        <p>No hay eventos para esta fecha.</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useEventosStore } from "@/stores/eventos";
import { useDate } from "vuetify";

const eventosStore = useEventosStore();
const date = ref<Date>(new Date());
const adapter = useDate();
const eventosDias = ref<Set<string>>(new Set());
const eventosSeleccionados = ref<any[]>([]);
const fechaActual = new Date();

onMounted(async () => {
  await eventosStore.findAll();
  procesarEventos();
  filtrarEventos(date.value);
});

const procesarEventos = () => {
  eventosDias.value.clear();
  eventosStore.eventos.forEach((evento) => {
    const fecha = new Date(evento.fechaInicio);
    const fechaKey = adapter.toISO(fecha)?.split("T")[0] || "";
    if (fechaKey) {
      eventosDias.value.add(fechaKey);
    }
  });
};

const allowedDates = (val: unknown): boolean => {
  if (typeof val !== "string" && !(val instanceof Date)) return false;
  const fechaStr = adapter.toISO(val)?.split("T")[0] || "";
  return eventosDias.value.has(fechaStr);
};

const filtrarEventos = (val: Date) => {
  const diaSeleccionado = adapter.toISO(val)?.split("T")[0];
  eventosSeleccionados.value = eventosStore.eventos.filter((evento) => {
    const fechaEvento = adapter.toISO(new Date(evento.fechaInicio))?.split("T")[0];
    return fechaEvento === diaSeleccionado;
  });
};


const formatearFecha = (fecha: Date | string) => {
  if (!fecha) return "Fecha no disponible";
  const fechaObj = fecha instanceof Date ? fecha : new Date(fecha);
  if (isNaN(fechaObj.getTime())) return "Fecha inválida";

  return fechaObj.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";
@import "@/assets/styles/_mixins.scss";

.calendario__titulo-eventos {
  font-weight: bold;
  margin: 1rem 0 0.5rem;
  color: $color-darkGreen;
  font-size: 1.8rem;
  font-family: $first-font;
  text-align: center;
}

.calendario__sin-eventos {
  text-align: center;
  font-style: italic;
  color: $color-lightgray;
  margin-top: 1rem;
  font-family: $first-font;
}

.calendario__eventos {
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin: 0 auto;
  margin-top: 1.5rem;
}

.calendario__cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  @include desktop {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
}

.evento-card {
  width: 300px;
  height: 450px;
  margin: 0 auto;
  background: url("@/assets/Images/fondo1.jpg") no-repeat center center;
  background-size: cover;
  border: 2px solid $color-gray;
  border-radius: 8px;
  color: #fff;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  @include desktop {
    width: 30%;
    margin: 1%;
  }

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
    font-size: 1.4rem;
    text-align: center;
    margin-bottom: 15px;
    color: $color-whitered;
    text-shadow: 2px 2px 5px rgba(255, 5, 5, 0.7);
  }

  &__info {
    margin-left: 10%;
    font-family: $first-font;
    font-size: 1.1rem;
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
