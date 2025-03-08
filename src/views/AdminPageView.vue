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

const currentView = ref<keyof typeof components>('UsuariosTable'); 


const components = {
  UsuariosTable: defineAsyncComponent(() => import('@/components/UsuariosTable.vue')),
  EventosTable: defineAsyncComponent(() => import('@/components/EventosTable.vue')),
  ComentariosTable: defineAsyncComponent(() => import('@/components/ComentarioTable.vue')),
  TematicaTable: defineAsyncComponent(() => import('@/components/TematicaTable.vue')),
  CategoriaEventoTable: defineAsyncComponent(() => import('@/components/CategoriaEventoTable.vue'))
} as const; 


const currentComponent = computed(() => components[currentView.value]);

</script>
  
<style scoped lang="scss">
 .contenido-admin{
  display: flex;
  align-items: center;
  justify-content: center;
 }
</style>
  