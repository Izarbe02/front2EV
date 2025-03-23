<script setup lang="ts">
import { useRoute } from 'vue-router';
import Header from '@/components/Header.vue';
import PatrocinadoresCard from '@/components/PatrocinadoresCard.vue';
import Footer from '@/components/Footer.vue';


const route = useRoute()
const organizadorId = route.query.id ? Number(route.query.id) : undefined;

</script>


<template>
    <Header/>

    <Footer/>
</template>



<style scoped lang="scss">


</style>