<template>
  <v-layout>
    <v-app-bar app class="navbar" height="auto">
      <v-container class="navbar__container">
        <!-- Fila superior: logo + botón ☰ -->
        <div class="navbar__top-row">
          <div class="navbar__logoZaragozaConecta">
            <a href="/"><LogoCanvas /></a>
            <router-link to="/">ZaragozaConecta</router-link>
          </div>
          <v-btn icon class="navbar__menu-button" @click.stop="drawer = !drawer">
            ☰
          </v-btn>
        </div>

        <!-- Buscador solo si estamos en /eventos -->
        <div v-if="estaEnEventos" class="navbar__buscador">
          <BuscadorEventos />
        </div>

        <!-- Navegación -->
        <div class="navbar__navigation">
          <v-btn to="/eventos" class="navbar__link">Eventos</v-btn>
          <v-btn to="/organizadores" class="navbar__link">Organizadores</v-btn>
          <v-btn to="/administrador" class="navbar__link">Gestión</v-btn>
          <v-btn to="/aboutUs" class="navbar__link">About us</v-btn>
          <v-btn
            v-if="!estaLogeado"
            to="/login"
            class="navbar__mobile-link navbar__mobile-login"
          >
            Iniciar Sesión
          </v-btn>
        </div>
      </v-container>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary class="navbar__mobile-menu">
      <v-list>
        <v-list-item to="/eventos" class="navbar__mobile-link">Eventos</v-list-item>
        <v-list-item to="/organizadores" class="navbar__mobile-link">Organizadores</v-list-item>
        <v-list-item to="/administrador" class="navbar__mobile-link">Gestión</v-list-item>
        <v-list-item to="/aboutUs" class="navbar__mobile-link">About us</v-list-item>
        <v-list-item
          v-if="!estaLogeado"
          to="/login"
          class="navbar__mobile-link navbar__mobile-login"
        >
          <img src="../assets/Images/group.png" alt="Grupo" class="navbar__mobile-logo" />
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUsuariosStore } from '@/stores/usuarios';
import { useOrganizadoresStore } from '@/stores/organizadores';
import { defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';
import BuscadorEventos from '@/components/BuscadorEventos.vue';

const LogoCanvas = defineAsyncComponent(() => import('@/components/LogoCanvas.vue'));

const drawer = ref(false);

const usuariosStore = useUsuariosStore();
const organizadoresStore = useOrganizadoresStore();

const estaLogeado = computed(() =>
  usuariosStore.usuarioLogeado !== null || organizadoresStore.organizadorLogeado !== null
);

const route = useRoute();
const estaEnEventos = computed(() => route.path.startsWith('/eventos'));
</script>

<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";
@import "@/assets/styles/_mixins.scss";

.navbar {
  background: $color-darkgray !important;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  font-family: $first-font;

  &__container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    width: 100%;
    padding: 10px 16px;
    gap: 12px;
    box-sizing: border-box;

    @media (min-width: 1280px) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      gap: 0;
    }
  }

  &__top-row {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    @media (min-width: 1280px) {
      justify-content: flex-start;
      gap: 20px;
    }
  }

  &__logoZaragozaConecta {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-family: $titulo;
    font-size: 1.6rem;
    font-weight: bold;

    a {
      color: red;
      text-decoration: none;
    }

    .router-link-active {
      margin-left: 10px;
      color: white;
      text-decoration: none;
    }
  }

  &__menu-button {
    color: $color-lightred;
    font-size: 28px;

    @media (min-width: 1280px) {
      display: none;
    }
  }

  &__buscador {
    width: 100%;

    .buscador {
      width: 100%;
      display: flex;
      gap: 10px;
    }

    .buscador__input {
      flex: 1;
      background-color: #272525;
      border: none;
      border-radius: 6px;
      padding: 10px;
      color: white;
    }

    .buscador__boton {
      background-color: #000;
      color: $color-lightred;
      border: 1px solid $color-red;
      border-radius: 6px;
      padding: 10px 15px;
      cursor: pointer;
    }

    @media (min-width: 1280px) {
      max-width: 400px;
      margin-left: auto;
    }
  }

  &__navigation {
    display: none;

    @media (min-width: 1280px) {
      display: flex;
      gap: 12px;
      align-items: center;
    }
  }

  &__mobile-menu {
    justify-content: space-between;
    background: $color-darkgray;
  }

  &__mobile-link {
    text-align: center;
    margin-top: 10px;
    color: white;
    justify-content: center;
    align-items: center;
    display: flex;
    font-family: $first-font;
    font-size: 23px;
    background-color: $color-red;
    transition: transform 0.2s ease, background-color 0.3s ease;

    &:hover {
      background-color: #a70816;
      transform: scale(1.05);
    }
  }

  &__mobile-login {
    @extend .navbar__mobile-link;

    img {
      width: 30px;
      height: 30px;
      margin-right: 8px;
    }
  }

  &__link {
    font-size: 28px;
    font-weight: bold;
    color: white;
    text-transform: none;
    position: relative;
    transition: transform 0.2s ease, color 0.3s ease;

    &:hover,
    &--active {
      color: $color-red;
      transform: scale(1.05);
    }
  }
}
</style>
