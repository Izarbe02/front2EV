<script setup lang="ts">
import TituloComp from '@/components/TituloComp.vue';
import EventoCard from '@/components/EventoCard.vue';
import Header from '@/components/Header.vue';

import Footer from '@/components/Footer.vue';

</script>

<template>

<Header/>

  <TituloComp text="Eventos" />
  <EventoCard nombre="Evento Uno" localizacion="SVG2" imagen="https://i.pinimg.com/736x/db/2e/a7/db2ea792c215b0f4cf20c31474630a51.jpg" :fecha="new Date(2025, 2, 20, 19, 30)"/>  
  <EventoCard nombre="Evento Dos" localizacion="SVG2" imagen="https://i.pinimg.com/736x/72/4e/f0/724ef07f4fc4b31b76d355fe3b20bfdb.jpg" :fecha="new Date(2025, 2, 20, 19, 30)"/>  

  <Footer/>
</template>