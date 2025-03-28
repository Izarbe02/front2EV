<script setup lang="ts">
import { useUsuariosStore } from '@/stores/usuarios'
import { computed } from 'vue'
import Header from '@/components/Header.vue'
import EventoGuardadoComp from '@/components/EventoGuardadoComp.vue'
import Footer from '@/components/Footer.vue'

const usuariosStore = useUsuariosStore()
const idUsuario = computed(() => usuariosStore.usuarioLogeado?.id)
</script>

<template>
  <Header />
  <EventoGuardadoComp v-if="idUsuario !== undefined" :idUsuario="idUsuario" />
  <div v-else>Cargando usuario...</div>
  <Footer />
</template>

<style lang="scss">
</style>
