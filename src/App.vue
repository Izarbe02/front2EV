<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';

import { defineComponent } from 'vue';
import MetaballBackground from '/components/MetaballBackground.vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

</script>

<template>
  <MetaballBackground />

  <RouterView />

</template>

<style scoped></style>
