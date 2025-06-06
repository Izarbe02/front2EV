<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const Header = defineAsyncComponent(() => import("@/components/Header.vue"));
const ProductoCard = defineAsyncComponent(() => import("@/components/ProductoCard.vue"));

import Footer from '@/components/Footer.vue';

</script>


<template>
    <Header/>
    <ProductoCard/>
    <Footer/>
</template>



<style scoped lang="scss">


</style>
