<template>
  <button class="toggle-btn" @click="toggleSidebar">☰</button>
  <div class="sidebar" :class="{ 'is-hidden': !isSidebarOpen }">
    <ul v-if="vistas.length > 0">
      <li v-for="vista in vistas" :key="vista" @click="setView(vista)">
        {{ nombres[vista] || vista }}
      </li>

      <router-link to="/" class="sidebar__link">Volver a la página principal</router-link>
      <button class="sidebar__logout" @click="handleLogout">Cerrar sesión</button>
    </ul>
    <p v-else class="sidebar__cargando">Cargando menú...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUsuariosStore } from '@/stores/usuarios';

const props = defineProps<{
  vistasPermitidas: string[];
}>();

const emit = defineEmits(['changeView', 'logout']);
const isSidebarOpen = ref(false);
const router = useRouter();
const store = useUsuariosStore();

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const setView = (view: string) => {
  emit('changeView', view);
};

const handleLogout = () => {
  store.logout();
  router.push('/');
};

// Traducciones de vistas
const nombres: Record<string, string> = {
  UsuariosTable: 'Usuarios',
  EventosTable: 'Eventos',
  ComentariosTable: 'Comentarios',
  TematicaTable: 'Temáticas',
  CategoriaEventoTable: 'Categoría Evento'
};

// Fallback: si no hay permisos aún, usar todos para evitar render vacío
const vistas = computed(() =>
  props.vistasPermitidas.length > 0
    ? props.vistasPermitidas
    : Object.keys(nombres)
);
</script>

<style scoped lang="scss">
.toggle-btn {
  position: fixed;
  top: 15px;
  left: 15px;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 18px;
  cursor: pointer;
  z-index: 1000;
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

  &__cargando {
    color: white;
    font-size: 1rem;
    padding: 20px;
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
