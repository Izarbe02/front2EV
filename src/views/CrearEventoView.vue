<script setup lang="ts">
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import CrearEventoComp from '@/components/CrearEventoComp.vue'
</script>

<template>
  <div class="crear-evento-view">
    <Header />

    <main class="crear-evento-view__main">
      <CrearEventoComp />
    </main>

    <Footer />
  </div>
</template>

<style scoped lang="scss">
.crear-evento-view__main {
  min-height: 100vh;
  padding-top: 100px;
  padding-bottom: 3rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
</style>
