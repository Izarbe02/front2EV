<script setup lang="ts">
import { useRoute } from 'vue-router';
import Header from '@/components/Header.vue';
import PatrocinadorForm from '@/components/PatrocinadorForm.vue';
import Footer from '@/components/Footer.vue';


const route = useRoute()
const organizadorId = route.query.id ? Number(route.query.id) : undefined;

</script>


<template>
    <Header/>
    <PatrocinadorForm/>
    <Footer/>
</template>



<style scoped lang="scss">


</style>