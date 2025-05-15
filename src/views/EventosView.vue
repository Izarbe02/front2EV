<script setup lang="ts">
import { onMounted } from "vue";
import { useEventosStore } from "@/stores/eventos";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import BuscadorEventos from "@/components/BuscadorEventos.vue";
import EventoCard from "@/components/EventoCard.vue";

const eventosStore = useEventosStore();

onMounted(async () => {
  await eventosStore.findAll();
});
</script>

<template>
  <Header />

  <main class="eventos-container">
    <div class="eventos-container__buscador">
      <BuscadorEventos />
    </div>

    <EventoCard />
  </main>

  <Footer />
</template>

<style scoped lang="scss">
.eventos-container {
  padding: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.eventos-container__buscador {
  width: 100%;
  max-width: 600px;
}
</style>
