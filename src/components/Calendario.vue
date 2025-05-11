<template>
  <v-container class="calendario">
    <v-row justify="space-around">
      <v-date-picker
        v-model="date"
        :allowed-dates="allowedDates"
        @update:model-value="filtrarEventos"
      ></v-date-picker>
    </v-row>

    <v-row class="calendario__eventos" v-if="eventosSeleccionados.length > 0">
      <v-col cols="12">
        <h3 class="calendario__titulo-eventos">Eventos del {{ dateString }}</h3>
      </v-col>

      <v-col
        v-for="(evento, index) in eventosSeleccionados"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        class="calendario__col-tarjeta"
      >
        <v-card class="calendario__tarjeta-evento" elevation="3">
          <v-card-title class="calendario__evento-nombre">{{ evento.nombre }}</v-card-title>
          <v-card-text class="calendario__evento-info">
            <p><strong>Ubicación:</strong> {{ evento.ubicacion || "No especificada" }}</p>
            <p><strong>Inicio:</strong> {{ new Date(evento.fechaInicio).toLocaleString() }}</p>
            <p v-if="evento.fechaFin"><strong>Fin:</strong> {{ new Date(evento.fechaFin).toLocaleString() }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

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

onMounted(async () => {
  await eventosStore.findAll();
  procesarEventos();
  filtrarEventos(date.value); // Mostrar eventos del día actual al cargar
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

const dateString = computed(() => {
  return adapter.format(date.value, "fullDateWithWeekday");
});
</script>

<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";

.calendario {
  margin-top: 1.5rem;
  font-family: $first-font;

  &__titulo-eventos {
    font-weight: bold;
    margin: 1rem 0 0.5rem;
    color: $color-darkGreen;
    font-size: 1.2rem;
  }

  &__sin-eventos {
    text-align: center;
    font-style: italic;
    color: $color-lightgray;
    margin-top: 1rem;
  }

  &__col-tarjeta {
    padding: 0.5rem;
  }

  &__tarjeta-evento {
    background-color: white;
    border-radius: 1rem;
    padding: 1rem;
    font-size: 0.95rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  &__evento-nombre {
    font-weight: 600;
    color: $color-red;
    font-size: 1.1rem;
  }

  &__evento-info p {
    margin: 0.3rem 0;
    color: $color-darkgray;
  }
}
</style>
