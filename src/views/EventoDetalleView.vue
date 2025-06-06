<script setup lang="ts">
import { useRoute } from 'vue-router'
import { defineAsyncComponent } from 'vue';

import Footer from '@/components/Footer.vue';
const Header = defineAsyncComponent(() => import("@/components/Header.vue"));
const DetalleEventoComp = defineAsyncComponent(() => import("@/components/DetalleEventoComp.vue"));


const route = useRoute()

const eventoId = route.query.id ? Number(route.query.id) : undefined;

</script>

<template>

  <Header/>
  <DetalleEventoComp :eventoId="eventoId" />
  <Footer/>

</template>

<style lang="scss">

</style>
