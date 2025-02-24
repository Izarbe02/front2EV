<template>
    <v-layout>
      <v-app-bar app class="navbar">

        <v-container class="navbar__container">

            <div class="navbar__navigation">
                <v-btn to="/eventos" class="navbar__link navbar__link--active">Eventos</v-btn>
                <v-btn to="/organizadores" class="navbar__link">Organizadores</v-btn>
                <v-btn to="/aboutUs" class="navbar__link">About us</v-btn>
            </div>
          <!-- Botón de menú hamburguesa SOLO en móviles -->
          <v-btn icon class="navbar__menu-button" @click.stop="drawer = !drawer">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
  
          <!-- Logo -->
          <v-img src="/logo.png" alt="Logo" class="navbar__logo" contain></v-img>
          
          <!-- Buscador siempre visible -->
          <div class="navbar__search">
            <v-text-field
              class="navbar__search-input"
              placeholder="Eventos..."
              dense
              solo
              hide-details
            />
            <v-btn class="navbar__search-button">Buscar</v-btn>
          </div>
        </v-container>
      </v-app-bar>
  
      <!-- Menú hamburguesa SOLO en móviles -->
      <v-navigation-drawer v-model="drawer" temporary class="navbar__mobile-menu">
        <v-list>
          <v-list-item to="/eventos" class="navbar__mobile-link">Eventos</v-list-item>
          <v-list-item to="/organizadores" class="navbar__mobile-link">Organizadores</v-list-item>
          <v-list-item to="/aboutUs" class="navbar__mobile-link">About us</v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    data() {
      return {
        drawer: false // Estado del menú en móviles
      };
    }
  });
  </script>
  
  <style lang="scss" scoped>
  @import "@/assets/styles/_variables.scss";
  @import "@/assets/styles/_mixins.scss";
  
  .navbar {
    background: $color-darkgray !important;
    padding: 10px 16px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    font-family: $first-font;
    
  
    &__container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
  
    &__menu-button {
      color: $color-lightred;
      display: block; // Visible en móviles
    }
  
    &__logo {
      height: 40px;
    }
  
    &__navigation {
      display: none; // Oculto en móviles
    }
  
    &__search {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-grow: 1;
      max-width: 300px;
      padding: 4px;
    }
  
    &__search-input {
      flex-grow: 1;
      background: $color-darkgray !important;
      border: 1px solid $color-red;
      color: white;
      border-radius: 4px;
      padding-left: 8px;
      font-size: 16px;
  
      &::placeholder {
        color: white;
      }
    }
  
    &__search-button {
      @include boton-rojo;
    }
  
    // 📌 Menú hamburguesa funcional usando Vuetify
    &__mobile-menu {
      background: $color-darkgray;
    }
  
    &__mobile-link {
      font-size: 16px;
      font-weight: bold;
      color: white;
      padding: 12px;
      text-decoration: none;
  
      &:hover {
        background: $color-lightred;
      }
    }
  
    // 📌 En pantallas grandes: Mostrar navegación y ocultar menú hamburguesa
    @media (min-width: 768px) {
      .navbar {
        flex-direction: row;
        justify-content: space-between;
      }
  
      .navbar__menu-button {
        display: none;
      }
  
      .navbar__navigation {
        display: flex;
        gap: 12px;
        align-items: center;
        
      }
  
      .navbar__mobile-menu {
        display: none; // Ocultar menú desplegable en escritorio
      }
  
      .navbar__search {
        max-width: 400px;
        justify-content: flex-end; // Buscador alineado a la derecha
      }
  
      .navbar__search-input {
        font-size: 18px;
      }
  
      .navbar__search-button {
        font-size: 16px;
      }

      &__link {
        font-size: 16px;
        font-weight: bold;
        color: white;
        text-transform: none;
        position: relative;

        &:hover,
        &--active {
            color: $color-red;
        }
    }
    }
  }
  </style>
  