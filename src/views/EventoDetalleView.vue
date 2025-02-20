<script setup lang="ts">
import TituloComp from '@/components/TituloComp.vue';
import Header from '@/components/Header.vue';

import Footer from '@/components/Footer.vue';

</script>

<template>

<Header/>
  <div class="Container">
    <TituloComp text="Titulo del evento corresponiente" />
    

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