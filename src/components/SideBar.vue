<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUsuariosStore } from '@/stores/usuarios';
import { useOrganizadoresStore } from '@/stores/organizadores';

const props = defineProps<{ vistasPermitidas: string[] }>();
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
  if (store.usuarioLogeado) {
    store.logout();
  }
  if (OrganizadoresStore.organizadorLogeado) {
    OrganizadoresStore.logoutOrganizador();
  }
  router.push('/');
  isSidebarOpen.value = false;
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
  CategoriaEventoTable: 'Categoría Evento',
  GraficaEventosPorMes: 'Eventos por mes'
};

const vistasFiltradas = computed(() =>
  props.vistasPermitidas.filter((v) => Object.keys(nombres).includes(v))
);
</script>

<template>
  <button class="sidebar__toggle-btn" @click="toggleSidebar">☰</button>

  <div class="sidebar" :class="{ 'sidebar--hidden': !isSidebarOpen }">
    <button class="sidebar__close-btn" @click="isSidebarOpen = false">✕</button>

    <ul class="sidebar__menu">
      <li
        v-for="vista in vistasFiltradas"
        :key="vista"
        class="sidebar__item"
      >
        <button class="sidebar__button" @click="setView(vista)">
          {{ nombres[vista] || vista }}
        </button>
      </li>

      <li class="sidebar__item">
        <router-link to="/" class="sidebar__button sidebar__button--link-out">
          Volver a la página principal
        </router-link>
      </li>

      <li class="sidebar__item">
        <button class="sidebar__button sidebar__button--logout" @click="handleLogout">
          Cerrar sesión
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/_variables.scss';
@import '@/assets/styles/_mixins.scss';



.sidebar__toggle-btn {
  position: fixed;
  top: 1rem;
  left: 1rem;
  background-color: $color-red;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  font-size: 1.4rem;
  font-family: $first-font;
  font-weight: bold;
  border-radius: 0.5rem;
  z-index: 9999;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: $color-lightred;
    box-shadow: 0 0 10px $color-lightred;
    transform: scale(1.05);
  }
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 260px;
  height: 100vh;
  background: linear-gradient(to bottom, $color-black, $color-darkgray);
  padding: 4rem 1.5rem 1rem;
  z-index: 9998;
  display: flex;
  flex-direction: column;
  transform: translateX(0);
  transition: transform 0.3s ease-in-out;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.4);

  &--hidden {
    transform: translateX(-100%);
  }

  &__close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.8rem;
    color: $color-lightred;
    cursor: pointer;

    &:hover {
      color: white;
    }
  }

  &__menu {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    margin-top: 50px;
  }

  &__item {
    margin-bottom: 1.5rem;
    text-align: center;
  }

  &__button {
    width: 100%;
    padding: 0.8rem 1.2rem;
    font-size: 1.1rem;
    font-family: $first-font;
    font-weight: bold;
    color: white;
    background-color: $color-lightred;
    border: none;
    border-radius: 0.6rem;
    cursor: pointer;
    text-align: center;
    transition:
      background-color 0.3s ease,
      box-shadow 0.3s ease,
      transform 0.2s ease;

    &:hover {
      background-color: $color-red;
      box-shadow: 0 0 12px $color-lightred;
      transform: scale(1.05);
    }

    &--link {
      display: inline-block;
      text-decoration: none;

      &-out{
       @include boton-borde-rosa
      }
    }

    &--logout {
      border: 1px solid white;
      background-color: transparent;
      color: white;

      &:hover {
        background-color: $color-red;
        transform: scale(1.05);
      }
    }
  }
}

@media (min-width: 768px) {
  .sidebar {
    max-width: 250px;
  }
}
</style>
