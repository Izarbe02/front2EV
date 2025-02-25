<template>
      <button class="toggle-btn" @click="toggleSidebar">☰</button>
      <div class="sidebar" :class="{ 'is-hidden': !isSidebarOpen }">
        <ul>
          <li v-for="option in options" :key="option.id" @click="selectOption(option)">
            <span class="icon">{{ option.icon }}</span>
            <span class="text">{{ option.title }}</span>
          </li>
        </ul>
      </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const options = ref([
    { id: 1, title: 'NEWS', icon: '📄', content: 'News content' },
    { id: 2, title: 'CHANNELS', icon: '🔲', content: 'Channels content' },
    { id: 3, title: 'BOOKMARKS', icon: '🔖', content: 'Bookmarks content' },
    { id: 4, title: 'OVERVIEW', icon: '📊', content: 'Overview content' },
    { id: 5, title: 'CALENDAR', icon: '📅', content: 'Calendar content' },
    { id: 6, title: 'TIMELINE', icon: '⏳', content: 'Timeline content' },
    { id: 7, title: 'PROFILE', icon: '👤', content: 'Profile content' },
    { id: 8, title: 'WIDGETS', icon: '⚙️', content: 'Widgets content' },
    { id: 9, title: 'SETTINGS', icon: '⚙️', content: 'Settings content' },
  ]);
  
  const selectedOption = ref<typeof options.value[0] | null>(null);
  const isSidebarOpen = ref(false);
  
  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
  };
  
  const selectOption = (option: typeof options.value[0]) => {
    selectedOption.value = option;
    isSidebarOpen.value = false; // Ocultar sidebar después de seleccionar una opción
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
    background: linear-gradient(to bottom, #d67e5c, #a65d3a);
    transform: translateX(0);
    transition: transform 0.3s ease-in-out;
  }
  
  .sidebar.is-hidden {
    transform: translateX(-100%);
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 15px 10px;
    cursor: pointer;
    font-weight: bold;
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
  