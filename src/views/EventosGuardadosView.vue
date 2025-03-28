<script setup lang="ts">
import { useUsuariosStore } from '@/stores/usuarios'
import { onMounted, ref } from 'vue'
import Header from '@/components/Header.vue';
import EventosGuardadosComp from '@/components/EventosGuardadosComp.vue';
import Footer from '@/components/Footer.vue';

const usuariosStore = useUsuariosStore()
const idUsuario = ref<number | null>(null)

onMounted(() => {
  idUsuario.value = usuariosStore.usuarioLogeado?.id || null
})
</script>

<template>
  <Header />
  <EventosGuardadosComp v-if="idUsuario" :idUsuario="idUsuario" />
  <div v-else>Cargando usuario...</div>
  <Footer />
</template>

<style lang="scss">
</style>
