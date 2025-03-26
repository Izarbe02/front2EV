<script setup lang="ts">
import { useRoute } from 'vue-router';
import Header from '@/components/Header.vue';
import PatrocinadorCreateForm from '@/components/PatrocinadorCreateForm.vue';
import Footer from '@/components/Footer.vue';


const route = useRoute()


</script>


<template>
    <Header/>
    <PatrocinadorCreateForm />
    <Footer/>
</template>



<style scoped lang="scss">


</style>