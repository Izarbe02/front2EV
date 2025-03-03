<template>
      <button class="toggle-btn" @click="toggleSidebar">☰</button>
      <div class="sidebar" :class="{ 'is-hidden': !isSidebarOpen }">
        <ul>
          <li @click="setView('UsuariosTable')">Usuarios</li>
          <li @click="setView('EventosTable')">Eventos</li>
          <li @click="setView('ComentariosTable')">Comentarios</li>
          <li @click="setView('TematicaTable')">Tematicas</li>
          <li @click="setView('CategoriaEventoTable')">Categoria Evento</li>
        </ul>
      </div>
  </template>
  
  <script setup lang="ts">
  import { ref, defineEmits } from 'vue';
  
  const emit = defineEmits(['changeView'])
  const isSidebarOpen = ref(false);
  
  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
  };
  
  const setView = (view: string) => {
    emit('changeView', view);
  };
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
  }
  
  li:hover {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
  }
  
  .icon {
    font-size: 18px;
  }
  
  </style>
  