<template>
  <div class="zona-admin">
    <SideBar
      @changeView="currentView = $event"
      @logout="handleLogout"
      :vistasPermitidas="permisosPorRol[rolUsuario] ?? []"
    />
    <div class="contenido-admin">
      <component :is="currentComponent" v-if="vistaPermitida" />
      <p v-else>No tienes permiso para acceder a esta sección.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useUsuariosStore } from '@/stores/usuarios';
import SideBar from '@/components/SideBar.vue';

const store = useUsuariosStore();
const router = useRouter();

const rolUsuario = computed(() => store.usuarioLogeado?.idRol ?? 3);
console.log(store.usuarioLogeado)
const currentView = ref<
  'UsuariosTable' | 'EventosTable' | 'ComentariosTable' | 'TematicaTable' | 'CategoriaEventoTable' | 'EventosGuardados'
>('UsuariosTable');

const components = {
  UsuariosTable: defineAsyncComponent(() => import('@/components/UsuariosTable.vue')),
  EventosTable: defineAsyncComponent(() => import('@/components/EventosTable.vue')),
  ComentariosTable: defineAsyncComponent(() => import('@/components/ComentarioTable.vue')),
  TematicaTable: defineAsyncComponent(() => import('@/components/TematicaTable.vue')),
  CategoriaEventoTable: defineAsyncComponent(() => import('@/components/CategoriaEventoTable.vue')),
  EventosGuardados: defineAsyncComponent(() => import('@/components/EventoGuardadoComp.vue')),
} as const;

const permisosPorRol: Record<number, (keyof typeof components)[]> = {
  1: ['UsuariosTable', 'EventosTable', 'ComentariosTable', 'TematicaTable', 'CategoriaEventoTable'],
  2: ['UsuariosTable', 'EventosTable'],
  3: ['UsuariosTable', 'EventosGuardados']
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
.contenido-admin {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
