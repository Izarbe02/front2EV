<script setup lang="ts">
import TituloComp from '@/components/TituloComp.vue';
import EventoCard from '@/components/EventoCard.vue';
import Header from '@/components/Header.vue';

import Footer from '@/components/Footer.vue';

</script>

<template>

<Header/>
  <div class="Container">
    <TituloComp text="EVENTOS" />
    <div class="eventos-container">
      <EventoCard nombre="Evento Uno" localizacion="SVG2" imagen="https://i.pinimg.com/736x/db/2e/a7/db2ea792c215b0f4cf20c31474630a51.jpg" :fecha="new Date(2025, 2, 20, 19, 30)"/>  
      <EventoCard nombre="Evento Dos" localizacion="SVG2" imagen="https://i.pinimg.com/736x/72/4e/f0/724ef07f4fc4b31b76d355fe3b20bfdb.jpg" :fecha="new Date(2025, 2, 20, 19, 30)"/>  
      <EventoCard nombre="Evento Dos" localizacion="SVG2" imagen="https://i.pinimg.com/736x/72/4e/f0/724ef07f4fc4b31b76d355fe3b20bfdb.jpg" :fecha="new Date(2025, 2, 20, 19, 30)"/>
      <EventoCard nombre="Evento Dos" localizacion="SVG2" imagen="https://i.pinimg.com/736x/72/4e/f0/724ef07f4fc4b31b76d355fe3b20bfdb.jpg" :fecha="new Date(2025, 2, 20, 19, 30)"/>
    </div>
    </div>

  <Footer/>
</template>

<style lang="scss">
  .Container{
    padding: 2%;
  }

  .eventos-container{
    margin-top: 25px;
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr;
    justify-items: center;
    margin-bottom: 30px;
  }


  @media (min-width: 768px){
    .eventos-container{
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
      margin-bottom: 50px;
    }
  }
</style>