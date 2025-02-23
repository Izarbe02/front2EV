<script setup lang="ts">
import Header from '@/components/Header.vue';
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
