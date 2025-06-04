<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const Header = defineAsyncComponent(() => import("@/components/Header.vue"));

import Footer from '@/components/Footer.vue';


const FormLogin = defineAsyncComponent(() => import('@/components/FormLogin.vue'));

</script>

<template>

<Header/>

  <FormLogin />

  <Footer/>
</template>
