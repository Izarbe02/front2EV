<script setup lang="ts">
import Header from '@/components/Header.vue'

import Footer from '@/components/Footer.vue'
import HomePage from '@/components/HomePage.vue'
import Calendario from '@/components/Calendario.vue';
import CarouselHomePage from '@/components/CarouselHomePage.vue';
</script>


<template>s


 <Header/>
 <div class="carouselContainer">
    <CarouselHomePage/>
 </div>
 <Calendario/>
 <HomePage/>


<Footer/>
</template>

<style scoped lang="scss">
.carouselContainer{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2%;
}
</style>
