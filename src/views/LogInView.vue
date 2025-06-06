<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
const FormLogin = defineAsyncComponent(() => import("@/components/FormLogin.vue"));
</script>

<template>
  <Header />
  <v-container class="login">
    <v-sheet class="login__sheet" elevation="8">
      <h2 class="login__title">Ingresar</h2>
      <p class="login__subtitle">.</p>
      <FormLogin />
    </v-sheet>
  </v-container>
  <Footer />
</template>
