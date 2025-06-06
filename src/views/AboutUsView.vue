<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const Header = defineAsyncComponent(() => import("@/components/Header.vue"));
import Footer from '@/components/Footer.vue';
import AboutUs from '@/components/AboutUs.vue';

</script>

<template>
  <Header />
  <main>
    <AboutUs />
  </main>
  <Footer />
</template>

<style lang="scss">
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
