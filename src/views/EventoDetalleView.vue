<script setup lang="ts">
import { useRoute } from 'vue-router'
import Header from '@/components/Header.vue';
import DetalleEventoComp from '@/components/DetalleEventoComp.vue'
import Footer from '@/components/Footer.vue';

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