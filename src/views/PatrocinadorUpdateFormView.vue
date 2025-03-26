<script setup lang="ts">
import { useRoute } from 'vue-router';
import Header from '@/components/Header.vue';
import PatrocinadorUpdateForm from '@/components/PatrocinadorUpdateForm.vue';
import Footer from '@/components/Footer.vue';


const route = useRoute()
const patrocinadorId = route.query.id ? Number(route.query.id) : undefined;

</script>


<template>
    <Header/>
    <PatrocinadorUpdateForm :patrocinadorId="patrocinadorId"/>
    <Footer/>
</template>



<style scoped lang="scss">


</style>