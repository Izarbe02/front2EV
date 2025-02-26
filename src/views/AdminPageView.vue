<template>
    <div class="zona-admin">
      <SideBar @changeView="currentView = $event" />
      <div class="contenido-admin">
        <component :is="currentComponent" />
      </div>
    </div>
</template>
  
<script setup lang="ts">
  import { ref, computed, defineAsyncComponent } from 'vue';
  import SideBar from '@/components/SideBar.vue';
  
  const currentView = ref('UsuariosTable');
  
  // Carga dinámica de componentes
  const components = {
    UsuariosTable: defineAsyncComponent(() => import('@/components/UsuariosTable.vue')),
    EventosTable: defineAsyncComponent(() => import('@/components/EventosTable.vue'))
  };
  
  const currentComponent = computed(() => components[currentView.value]);
</script>
  
<style scoped lang="scss">
 
</style>
  