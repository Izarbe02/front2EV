<template> 
  <v-layout>
    <v-app-bar app class="navbar">
      <v-container class="navbar__container">
        <a href="/">
          <LogoCanvas :canvasSize="120" />
        </a>
        <router-link to="/" class="navbar__tituloConecta">ZaragozaConecta</router-link>
       
        
        <!-- Navegación en pantallas grandes -->
        <div class="navbar__navigation">
          <v-btn to="/eventos" class="navbar__link navbar__link--active">Eventos</v-btn>
          <v-btn to="/organizadores" class="navbar__link">Organizadores</v-btn>
          <v-btn to="/aboutUs" class="navbar__link">About us</v-btn>
          <v-btn to="/login" class="navbar__mobile-link navbar__mobile-login"><img src="../assets/Images/group.png" to="/login" alt="Grupo" class="navbar__mobile-logo"></v-btn>
        </div>

        <!-- Botón de menú hamburguesa SOLO en móviles -->
        <v-btn icon class="navbar__menu-button" @click.stop="drawer = !drawer">
          ☰
        </v-btn>
      </v-container>
    </v-app-bar>

    <!-- Menú hamburguesa SOLO en móviles -->
    <v-navigation-drawer v-model="drawer" temporary class="navbar__mobile-menu">
      <v-list>
        <v-list-item to="/eventos" class="navbar__mobile-link">Eventos</v-list-item>
        <v-list-item to="/organizadores" class="navbar__mobile-link">Organizadores</v-list-item>
        <v-list-item to="/aboutUs" class="navbar__mobile-link">About us</v-list-item>
        <v-list-item to="/login" class="navbar__mobile-link navbar__mobile-login"><img src="../assets/Images/group.png" to="/login" alt="Grupo" class="navbar__mobile-logo"></v-list-item>
      </v-list>
      
    </v-navigation-drawer>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LogoCanvas from "@/components/LogoCanvas.vue";
export default defineComponent({
  components: {
    LogoCanvas
  },
  data() {
    return {
      drawer: false
    };
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
@import "@/assets/styles/_mixins.scss";

.navbar {
  background: $color-darkgray !important;
  padding: 10px 5px;
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
    display: block; 
  }

  &__navigation {
    display: none; 
  }

  &__tituloConecta {
    font-family: $titulo;
    font-size: 1.8rem;
    font-weight: bold;
    color: red;
    text-decoration: none;
  }

  // Botón de login en desktop
  &__login-btn {
    @include boton-rojo;
    display: none; // Ocultar en móvil
  }

  // Menú de navegación móvil
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

  &__mobile-login {
    @include boton-rojo;
    text-align: center;
    margin-top: 10px;
  }

  // desktop
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
      display: none; 
    }

    .navbar__login-btn {
      display: block; 
    }

    &__tituloConecta{
      font-weight: bold;
      color: inherit;
      text-decoration: none;
      color: $color-red;
  }
    &__link {
      font-size: 28px;
      font-weight: bold;
      color: rgb(255, 255, 255);
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
