<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useEventosStore } from "@/stores/eventos";
import { useRouter } from "vue-router";
import type EventoDto from "@/stores/dtos/evento.dto";

const eventosStore = useEventosStore();
const router = useRouter();
const selectedDate = ref(new Date().toISOString().substr(0, 10)); // Fecha seleccionada
const pickerDate = ref(null); // Mes seleccionado
const events = ref<{ name: string; start: string; end: string; id: number }[]>([]);
const eventNotes = ref<string[]>([]);

// Función para formatear fechas a "YYYY-MM-DD"
const formatFecha = (fecha: Date): string => {
  return new Date(fecha).toISOString().split("T")[0];
};

// Cargar eventos desde la base de datos
const cargarEventos = async () => {
  await eventosStore.proximosEventos();

  events.value = eventosStore.eventosProximos.map((evento: EventoDto) => ({
    name: evento.nombre,
    start: formatFecha(evento.fecha_inicio), // Convertir a "YYYY-MM-DD"
    end: evento.fecha_fin ? formatFecha(evento.fecha_fin) : formatFecha(evento.fecha_inicio), // Si no hay fecha de fin, usar la de inicio
    id: evento.id,
  }));
};

// Detectar cambio de mes y actualizar las notas
watch(pickerDate, (val) => {
  if (val) {
    const eventosDelMes = events.value.filter(evento => evento.start.startsWith(val));
    eventNotes.value = eventosDelMes.map(evento => evento.name);
  }
});

// Redirigir a la página de detalle del evento al hacer clic en una fecha
const irADetalleEvento = ({ date }: { date: string }) => {
  const eventoEncontrado = events.value.find(evento => evento.start === date);
  if (eventoEncontrado) {
    router.push(`/evento/${eventoEncontrado.id}`);
  }
};

onMounted(cargarEventos);
</script>

<template>
  <div class="event-calendar">
    <v-app>
      <v-layout row wrap>
        <!-- Selector de Fecha -->
        <v-flex xs12 sm6 class="my-2 px-1">
          <v-date-picker
            v-model="selectedDate"
            :picker-date.sync="pickerDate"
            full-width
            @input="irADetalleEvento({ date: selectedDate })"
          ></v-date-picker>
        </v-flex>

        <!-- Eventos del mes -->
        <v-flex xs12 sm6 class="my-2 px-1">
          <div class="title">Eventos del mes ({{ pickerDate || "Cambia de mes..." }})</div>
          <div class="subheading">Cambia de mes para ver más eventos</div>
          <ul class="ma-3">
            <li v-for="note in eventNotes" :key="note">{{ note }}</li>
          </ul>
        </v-flex>
      </v-layout>
    </v-app>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.event-calendar {
  width: 100%;
  max-width: 1200px;
  margin: auto;
}
</style>
