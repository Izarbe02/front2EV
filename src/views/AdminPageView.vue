<template>
    <div class="zona-admin">
      <SideBar
  @changeView="currentView = $event"
  @logout="handleLogout"
  :vistasPermitidas="permisosPorRol[rolUsuario] ?? []"
/>




      <div class="contenido-admin">
        <component :is="currentComponent" />
      </div>
    </div>
    <p style="color: white; font-size: 12px;">Permisos: {{ vistasPermitidas }}</p>

</template>
  
<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useUsuariosStore } from '@/stores/usuarios';
import SideBar from '@/components/SideBar.vue';

const store = useUsuariosStore();
const router = useRouter();
console.log('ROL USUARIO:', store.usuarioLogeado);

const rolUsuario = computed(() => store.usuarioLogeado?.idRol ?? 3);

const currentView = ref<'UsuariosTable' | 'EventosTable' | 'ComentariosTable' | 'TematicaTable' | 'CategoriaEventoTable'>('');

const components = {
  UsuariosTable: defineAsyncComponent(() => import('@/components/UsuariosTable.vue')),
  EventosTable: defineAsyncComponent(() => import('@/components/EventosTable.vue')),
  ComentariosTable: defineAsyncComponent(() => import('@/components/ComentarioTable.vue')),
  TematicaTable: defineAsyncComponent(() => import('@/components/TematicaTable.vue')),
  CategoriaEventoTable: defineAsyncComponent(() => import('@/components/CategoriaEventoTable.vue')),
} as const;

// Permisos por rol
const permisosPorRol: Record<number, string[]> = {
  1: ['UsuariosTable', 'EventosTable', 'ComentariosTable', 'TematicaTable', 'CategoriaEventoTable'],
  2: ['UsuariosTable', 'EventosTable'],
  3: ['UsuariosTable']
};

const vistaPermitida = computed(() =>
  permisosPorRol[rolUsuario.value]?.includes(currentView.value)
);

const currentComponent = computed(() => components[currentView.value]);

function handleLogout() {
  store.logout();
  router.push('/');
}
</script>
  
<style scoped lang="scss">
 .contenido-admin{
  display: flex;
  align-items: center;
  justify-content: center;
 }
</style>
  