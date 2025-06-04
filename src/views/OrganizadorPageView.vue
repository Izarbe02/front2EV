<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const Header = defineAsyncComponent(() => import("@/components/Header.vue"));
const OrganizadoresCard = defineAsyncComponent(() => import("@/components/OrganizadoresCard.vue"));
import Footer from '@/components/Footer.vue';


</script>


<template>
    <Header/>
    <OrganizadoresCard/>
    <Footer/>
</template>



<style scoped lang="scss">


</style>
