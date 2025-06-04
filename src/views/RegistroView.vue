<script setup lang="ts">

import { defineAsyncComponent } from 'vue';

const Header = defineAsyncComponent(() => import("@/components/Header.vue"));

const FormRegister = defineAsyncComponent(() => import("@/components/FormRegister.vue"));

import Footer from '@/components/Footer.vue'

</script>

<template>

<Header/>

  <FormRegister />

  <Footer/>
</template>
