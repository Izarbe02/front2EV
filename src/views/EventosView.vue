<script setup lang="ts">
import { onMounted } from "vue";
import { useEventosStore } from "@/stores/eventos";
import Footer from "@/components/Footer.vue";

import { defineAsyncComponent } from 'vue';

const Header = defineAsyncComponent(() => import("@/components/Header.vue"));

const BuscadorEventos = defineAsyncComponent(() => import("@/components/BuscadorEventos.vue"));

const EventoCard = defineAsyncComponent(() => import('@/components/EventoCard.vue'));

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
