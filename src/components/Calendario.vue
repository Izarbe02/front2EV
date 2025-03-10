<template>
    <v-container class="calendar-container">
      <v-row justify="center">
        <v-sheet class="calendar-sheet">
          <VCalendar
            v-model="selectedDate"
            type="month"
            :events="groupedEvents"
            event-color="orange"
            class="calendar"
          />
        </v-sheet>
      </v-row>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useEventosStore } from "@/stores/eventos";
  
  const eventosStore = useEventosStore();
  const selectedDate = ref<Date[]>([new Date()]);
  
  type CalendarEvent = {
    name: string;
    start: Date;
    end: Date;
    color: string;
    timed: boolean;
  };
  
  const groupedEvents = ref<CalendarEvent[]>([]);
  
  onMounted(async () => {
    await eventosStore.findAll();
    agruparEventosPorDia();
  });
  
  const agruparEventosPorDia = () => {
    const eventosPorDia = new Map<string, CalendarEvent>();
  
    eventosStore.eventos.forEach(evento => {
      const fecha = new Date(evento.fechaInicio);
      const fechaKey = fecha.toISOString().split("T")[0];
  
      if (!eventosPorDia.has(fechaKey)) {
        eventosPorDia.set(fechaKey, {
          name: "Evento",
          start: fecha,
          end: fecha,
          color: "orange",
          timed: false,
        });
      }
    });
  
    groupedEvents.value = Array.from(eventosPorDia.values());
    console.log("Eventos agrupados:", groupedEvents.value);
  };
  </script>
  
  <style scoped>
  
  .calendar-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
  
  .calendar-sheet {
    width: 90%;
    max-width: 600px;
    background-color: white;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .calendar {
    width: 100%;
    max-width: 600px;
  }
  
  :deep(.v-calendar-month__day) {
    min-height: 50px !important;
    height: 50px !important;
    padding: 2px !important;
  }
  
  :deep(.v-event) {
    font-size: 10px !important;
    padding: 1px 4px !important;
  }
  
  :deep(.v-calendar-weekly__head-weekday) {
    font-size: 12px !important;
    padding: 2px !important;
  }
  </style>
  