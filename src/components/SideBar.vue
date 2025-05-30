<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUsuariosStore } from '@/stores/usuarios';
import { useOrganizadoresStore } from '@/stores/organizadores';

const props = defineProps<{
  vistasPermitidas: string[];
}>();

const emit = defineEmits(['changeView', 'logout']);
const isSidebarOpen = ref(false);
const router = useRouter();
const store = useUsuariosStore();
const OrganizadoresStore = useOrganizadoresStore();

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const setView = (view: string) => {
  emit('changeView', view);
  isSidebarOpen.value = false;         
};

const handleLogout = () => {
  if (store.usuarioLogeado)
{
  store.logout();
  router.push('/');
  isSidebarOpen.value = false;
}
if (OrganizadoresStore.organizadorLogeado){
  OrganizadoresStore.logoutOrganizador();
  router.push('/');
  isSidebarOpen.value = false;

}
};

const nombres: Record<string, string> = {
  FeedEventosSeguidos: 'Novedades de organizadores',
  GestionFollowOrganizador: 'Organizadores seguidos',
  EventosGuardados: 'Eventos guardados',
  EditarPerfilUsuario: 'Mi perfil',
  UsuariosTable: 'Usuarios',
  EventosTable: 'Eventos',
  ComentariosTable: 'Comentarios',
  TematicaTable: 'Temáticas',
  CategoriaEventoTable: 'Categoría Evento'
};

const vistasFiltradas = computed(() =>
  props.vistasPermitidas.filter((v) => Object.keys(nombres).includes(v))
);
</script>

<template>
  <button class="toggle-btn" @click="toggleSidebar">☰</button>

  <div class="sidebar" :class="{ 'is-hidden': !isSidebarOpen }">
    <button class="sidebar__close-btn" @click="isSidebarOpen = false">✕</button>

    <ul>
      <li
        v-for="vista in vistasFiltradas"
        :key="vista"
        @click="setView(vista)"
      >
        {{ nombres[vista] || vista }}
      </li>

      <router-link to="/" class="sidebar__link">Volver a la página principal</router-link>
      <button class="sidebar__logout" @click="handleLogout">Cerrar sesión</button>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";

.toggle-btn {
  position: fixed;
  top: 15px;
  left: 15px;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 18px;
  cursor: pointer;
  z-index: 9999;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  padding: 60px 15px;
  background: linear-gradient(to bottom, #000000, #1d1d1d);
  transform: translateX(0);
  transition: transform 0.3s ease-in-out;
  z-index: 9999;

  &__close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.5rem;
    font-weight: bold;
    color: red;
    cursor: pointer;

    &:hover {
      color: white;
    }
  }

  &__link {
    margin-top: 4%;
    display: flex;
    align-items: center;
    gap: 7%;
    padding: 20px 10px;
    cursor: pointer;
    font-weight: bold;
    font-size: 1.2rem;
    color: rgb(219, 86, 97);
    text-decoration: none;
  }

  &__logout {
    margin-top: 10%;
    background: none;
    border: none;
    font-size: 1.2rem;
    font-weight: bold;
    color: red;
    cursor: pointer;
    padding: 10px;
    text-align: left;

    &:hover {
      background-color: white;
      color: gray;
      border-radius: 5px;
    }
  }
}

.sidebar.is-hidden {
  transform: translateX(-100%);
}

li {
  margin-top: 4%;
  display: flex;
  align-items: center;
  gap: 7%;
  padding: 20px 10px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.2rem;
  color: white;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
  }
}
</style>
