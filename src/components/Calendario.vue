<template>
  <v-container class="calendario">
    <v-row justify="space-around">
      <v-date-picker
        v-model="date"
        :allowed-dates="allowedDates"
      ></v-date-picker>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useEventosStore } from "@/stores/eventos";
import { useDate } from "vuetify";

const eventosStore = useEventosStore();
const date = ref<Date>(new Date());
const adapter = useDate();
const eventosDias = ref<Set<string>>(new Set());

onMounted(async () => {
  await eventosStore.findAll();
  procesarEventos();
});

const procesarEventos = () => {
  eventosDias.value.clear();
  eventosStore.eventos.forEach(evento => {
    const fecha = new Date(evento.fechaInicio);
    const fechaKey = adapter.toISO(fecha)?.split("T")[0] || "";
    if (fechaKey) {
      eventosDias.value.add(fechaKey);
    }
  });
  console.log("Días con eventos:", eventosDias.value);
};

const allowedDates = (val: unknown): boolean => {
  if (typeof val !== "string" && !(val instanceof Date)) return false;
  const fechaStr = adapter.toISO(val)?.split("T")[0] || "";
  return eventosDias.value.has(fechaStr);
};
</script>

<style scoped lang="scss">
.calendario{
  margin-top: 3%;
  
}

</style>
