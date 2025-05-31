<template>
  <v-layout>
    <v-app-bar app class="navbar">
      <v-container class="navbar__container">
        <div class="navbar__logoZaragozaConecta">
          <a href="/">
            <LogoCanvas />
          </a>
          <router-link to="/">ZaragozaConecta</router-link>
        </div>

        <!-- Navegación en pantallas grandes -->
        <div class="navbar__navigation">
          <v-btn to="/eventos" class="navbar__link navbar__link--active">Eventos</v-btn>
          <v-btn to="/organizadores" class="navbar__link">Organizadores</v-btn>
          <v-btn to="/administrador" class="navbar__link">Gestión</v-btn>
          <v-btn to="/aboutUs" class="navbar__link">About us</v-btn>
          <v-btn v-if="!estaLogeado" to="/login" class="navbar__mobile-link navbar__mobile-login">
            Iniciar Sesión
          </v-btn>
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

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useUsuariosStore } from '@/stores/usuarios';
import { useOrganizadoresStore } from '@/stores/organizadores';
import LogoCanvas from "@/components/LogoCanvas.vue";

export default defineComponent({
  components: {
    LogoCanvas
  },
  data() {
    return {
      drawer: false
    };
  },
  setup() {
    const usuariosStore = useUsuariosStore();
    const organizadoresStore = useOrganizadoresStore();

    const estaLogeado = computed(() =>
      usuariosStore.usuarioLogeado !== null || organizadoresStore.organizadorLogeado !== null
    );

    return {
      estaLogeado
    };
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
@import "@/assets/styles/_mixins.scss";

.navbar {
  background: $color-darkgray !important;
  padding: 10px 0px;
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
  }

  &__menu-button {
    color: $color-lightred;
    display: block;
  }

  &__navigation {
    display: none;
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

  .navbar__mobile-login {
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
  }
}
</style>
