<template>
  <div class="zona-admin">
    <template v-if="estaLogeado">
      <SideBar
        @changeView="currentView = $event"
        @logout="handleLogout"
        :vistasPermitidas="permisosPorRol[rolActivo] ?? []"
      />
      <div class="contenido-admin">
        <component :is="currentComponent" v-if="vistaPermitida" />
        <p v-else>No tienes permiso para acceder a esta sección.</p>
      </div>
    </template>

    <template v-else>
      <div class="contenido-no-logeado">
        <p class="mensaje">El usuario debe iniciar sesión.</p>
        <router-link to="/login" class="boton-login">Ir a iniciar sesión</router-link>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useUsuariosStore } from '@/stores/usuarios';
import { useOrganizadoresStore } from '@/stores/organizadores';

const SideBar = defineAsyncComponent(() => import("@/components/SideBar.vue"));

const usuariosStore = useUsuariosStore();
const organizadoresStore = useOrganizadoresStore();
const router = useRouter();


const usuario = computed(() => usuariosStore.usuarioLogeado);
const organizador = computed(() => organizadoresStore.organizadorLogeado);

const estaLogeado = computed(() => usuario.value !== null || organizador.value !== null);

const rolActivo = computed(() => {
  return usuario.value?.idRol ?? organizador.value?.idRol ?? -1;
});


const vistasInicialesPorRol: Record<number, keyof typeof components> = {
  1: 'UsuariosTable',
  2: 'EventosTable',
  3: 'FeedEventosSeguidos'
};

const currentView = ref<keyof typeof components>(
  vistasInicialesPorRol[usuario.value?.idRol ?? organizador.value?.idRol ?? -1] || 'EventosTable'
);


const components = {
  FeedEventosSeguidos: defineAsyncComponent(() => import('@/components/FeedEventosSeguidos.vue')),
  GestionFollowOrganizador: defineAsyncComponent(() => import('@/components/GestionFollowOrganizador.vue')),
  UsuariosTable: defineAsyncComponent(() => import('@/components/UsuariosTable.vue')),
  EventosTable: defineAsyncComponent(() => import('@/components/EventosTable.vue')),
  TematicaTable: defineAsyncComponent(() => import('@/components/TematicaTable.vue')),
  CategoriaEventoTable: defineAsyncComponent(() => import('@/components/CategoriaEventoTable.vue')),
  EventosGuardados: defineAsyncComponent(() => import('@/components/EventoGuardadoComp.vue')),
  EditarPerfilUsuario: defineAsyncComponent(() => import('@/components/EditarPerfilUsuario.vue')),
  GraficaEventosPorMes: defineAsyncComponent(() => import('@/components/GraficaEventosPorMes.vue')),
  EditarPerfilOrganizador: defineAsyncComponent(() => import('@/components/EditarPerfilOrganizador.vue'))
} as const;



const permisosPorRol: Record<number, (keyof typeof components)[]> = {
  1: ['UsuariosTable', 'EventosTable', 'TematicaTable', 'CategoriaEventoTable', 'GraficaEventosPorMes'],
  2: ['EventosTable', 'EditarPerfilOrganizador','GraficaEventosPorMes'],

  3: ['FeedEventosSeguidos', 'GestionFollowOrganizador', 'EventosGuardados', 'EditarPerfilUsuario']
};

const vistaPermitida = computed(() =>
  permisosPorRol[rolActivo.value]?.includes(currentView.value)
);

const currentComponent = computed(() => components[currentView.value]);

function handleLogout() {
  usuariosStore.logout();
  organizadoresStore.logoutOrganizador();
  router.push('/');
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";
@import "@/assets/styles/_mixins.scss";

.contenido-admin {
  display: flex;
  align-items: center;
  justify-content: center;
}

.contenido-no-logeado {
  width: 100%;
  height: 100vh;
  background-color: $color-darkgray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .mensaje {
    font-size: 1.4rem;
    color: white;
    margin-bottom: 20px;
    font-weight: bold;
  }

  .boton-login {
    background-color: $color-red;
    color: white;
    padding: 12px 24px;
    font-size: 1rem;
    text-decoration: none;
    border-radius: 6px;
    font-weight: bold;

    &:hover {
      background-color: $color-lightred;
    }
  }
}
</style>
