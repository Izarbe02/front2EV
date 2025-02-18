<script setup lang="ts">
import {ref} from 'vue;'
  defineProps<{
    nombre: string;
    localizacion: string;
    fecha: Date;
    imagen: string;
  }>()
</script>


<template>
    <v-card
      class="mx-auto"
      max-width="344"
    >
      <v-img
        height="200px"
        :src="imagen"
        cover
      ></v-img>
  
      <v-card-title>
        {{ nombre }}
      </v-card-title>
  
      <v-card-subtitle>
        {{ localizacion }}
      </v-card-subtitle>
      
      <v-card-subtitle>
        {{ fecha.toLocaleDateString() }} - Hora: {{ fecha.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) }}
      </v-card-subtitle>

      <v-card-actions>
        <v-btn
          color="orange-lighten-2"
          text="Explore"
        ></v-btn>
  
        <v-spacer></v-spacer>
  
        <v-btn
          :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="show = !show"
        ></v-btn>
      </v-card-actions>
  
    </v-card>
  </template>


<style scoped lang="scss">



</style>