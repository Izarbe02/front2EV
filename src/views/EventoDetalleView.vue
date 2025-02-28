<script setup lang="ts">
import { useRoute } from 'vue-router'
import Header from '@/components/Header.vue';
import DetalleEventoComp from '@/components/DetalleEventoComp.vue'
import Footer from '@/components/Footer.vue';

const route = useRoute()
const eventoId = route.params.id

</script>

<template>

  <Header/>
  <DetalleEventoComp :eventoId="Number(eventoId)" />
  <Footer/>
  
</template>

<style lang="scss">
 
</style>