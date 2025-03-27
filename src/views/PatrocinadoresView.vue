<script setup lang="ts">
import { useRoute } from 'vue-router';
import Header from '@/components/Header.vue';
import PatrocinadoresCard from '@/components/PatrocinadoresCard.vue';
import Footer from '@/components/Footer.vue';


const route = useRoute()

</script>


<template>
    <Header/>
    <PatrocinadoresCard/>
    <Footer/>
</template>



<style scoped lang="scss">


</style>