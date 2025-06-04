<script setup lang="ts">
import { useRoute } from 'vue-router';
import { defineAsyncComponent } from 'vue';

const Header = defineAsyncComponent(() => import("@/components/Header.vue"));
const OrganizadorDetalle = defineAsyncComponent(() => import("@/components/OrganizadorDetalle.vue"));

import Footer from '@/components/Footer.vue';


const route = useRoute()
const organizadorId = route.query.id ? Number(route.query.id) : undefined;

</script>


<template>
    <Header/>
    <OrganizadorDetalle :organizadorId="organizadorId"/>
    <Footer/>
</template>



<style scoped lang="scss">


</style>
