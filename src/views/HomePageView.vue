<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const Header = defineAsyncComponent(() => import("@/components/Header.vue"));
const Calendario = defineAsyncComponent(() => import("@/components/Calendario.vue"));
const CarouselHomePage = defineAsyncComponent(() => import("@/components/CarouselHomePage.vue"));
import Footer from '@/components/Footer.vue'
import HomePage from '@/components/HomePage.vue'

</script>


<template>


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
