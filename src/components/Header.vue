<template>
  <v-layout>
    <v-app-bar app class="navbar">
      <v-container class="navbar__container">
        <div class="navbar__brand">
          <div class="navbar__logo-wrapper">
            <a href="/" class="navbar__logo-link">
              <LogoCanvas />
            </a>
          </div>
          <router-link to="/" class="navbar__brand-text">ZaragozaConecta</router-link>
        </div>

        <nav class="navbar__navigation">
          <v-btn
            v-for="link in navigationLinks"
            :key="link.route"
            :to="link.route"
            :class="['navbar__link', { 'navbar__link--active': link.active }]"
          >
            {{ link.text }}
          </v-btn>
          <v-btn
            v-if="!estaLogeado"
            to="/login"
            class="navbar__cta"
          >
            <span class="navbar__cta-icon">👤</span>
            Iniciar Sesión
          </v-btn>
        </nav>

        <v-btn icon class="navbar__menu-toggle" @click.stop="drawer = !drawer">
          <div class="navbar__hamburger" :class="{ 'navbar__hamburger--active': drawer }">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </v-btn>
      </v-container>

      <!-- Animated gradient line -->
      <div class="navbar__gradient-line"></div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary class="navbar__mobile-drawer">
      <div class="navbar__mobile-header">
        <h3 class="navbar__mobile-title">Menú</h3>
        <v-btn icon @click="drawer = false" class="navbar__mobile-close">✕</v-btn>
      </div>

      <v-list class="navbar__mobile-list">
        <v-list-item
          v-for="link in navigationLinks"
          :key="link.route"
          :to="link.route"
          class="navbar__mobile-item"
          @click="drawer = false"
        >
          <div class="navbar__mobile-item-content">
            <span class="navbar__mobile-item-icon">{{ link.icon }}</span>
            <span class="navbar__mobile-item-text">{{ link.text }}</span>
          </div>
        </v-list-item>

        <v-list-item
          v-if="!estaLogeado"
          to="/login"
          class="navbar__mobile-item navbar__mobile-item--cta"
          @click="drawer = false"
        >
          <div class="navbar__mobile-item-content">
            <span class="navbar__mobile-item-icon">👤</span>
            <span class="navbar__mobile-item-text">Iniciar Sesión</span>
          </div>
        </v-list-item>
      </v-list>

      <!-- Mobile drawer decoration -->
      <div class="navbar__mobile-decoration"></div>
    </v-navigation-drawer>
  </v-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUsuariosStore } from '@/stores/usuarios';
import { useOrganizadoresStore } from '@/stores/organizadores';
import { defineAsyncComponent } from 'vue';

const LogoCanvas = defineAsyncComponent(() => import('@/components/LogoCanvas.vue'));

const drawer = ref(false);

const usuariosStore = useUsuariosStore();
const organizadoresStore = useOrganizadoresStore();

const estaLogeado = computed(() =>
  usuariosStore.usuarioLogeado !== null || organizadoresStore.organizadorLogeado !== null
);

const navigationLinks = [
  { route: '/eventos', text: 'Eventos', icon: '🎪', active: true },
  { route: '/organizadores', text: 'Organizadores', icon: '👥', active: false },
  { route: '/administrador', text: 'Gestión', icon: '⚙️', active: false },
  { route: '/aboutUs', text: 'About us', icon: 'ℹ️', active: false }
];
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
@import "@/assets/styles/_mixins.scss";

.navbar {
  background: linear-gradient(135deg, $color-darkgray 0%, rgba($color-gray, 0.95) 100%) !important;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba($color-lightred, 0.1);
  padding: 0 !important;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  font-family: $first-font;
  box-shadow: 0 8px 32px rgba($color-black, 0.3);

  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    max-width: 100%;

    @media (min-width: 768px) {
      padding: 1rem 2rem;
    }
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    position: relative;

    @media (min-width: 768px) {
      gap: 1rem;
    }
  }

  &__logo-wrapper {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: -5px;
      left: -5px;
      right: -5px;
      bottom: -5px;
      background: radial-gradient(circle, rgba($color-red, 0.2) 0%, transparent 70%);
      border-radius: 50%;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover::after {
      opacity: 1;
    }
  }

  &__logo-link {
    display: block;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  &__brand-text {
    font-family: $titulo;
    font-size: 1.4rem;
    font-weight: 700;
    color: $color-lightred;
    text-decoration: none;
    background: linear-gradient(45deg, $color-red, $color-lightred);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all 0.3s ease;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, $color-red, $color-lightred);
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }

    @media (min-width: 768px) {
      font-size: 1.6rem;
    }

    @media (min-width: 1024px) {
      font-size: 1.8rem;
    }
  }

  &__navigation {
    display: none;
    align-items: center;
    gap: 0.5rem;

    @media (min-width: 768px) {
      display: flex;
      gap: 1rem;
    }

    @media (min-width: 1024px) {
      gap: 1.5rem;
    }
  }

  &__link {
    font-size: 0.9rem;
    font-weight: 600;
    color: rgba(white, 0.9);
    text-transform: none;
    position: relative;
    padding: 0.5rem 1rem;
    border-radius: 25px;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    border: 1px solid transparent;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, rgba($color-red, 0.1), rgba($color-lightred, 0.1));
      border-radius: 25px;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover,
    &--active {
      color: white;
      transform: translateY(-2px);
      border-color: rgba($color-red, 0.5);
      box-shadow: 0 4px 12px rgba($color-red, 0.3);

      &::before {
        opacity: 1;
      }
    }

    &--active {
      background: linear-gradient(45deg, rgba($color-red, 0.2), rgba($color-lightred, 0.1));
      border-color: $color-red;
    }

    @media (min-width: 1024px) {
      font-size: 1rem;
      padding: 0.6rem 1.2rem;
    }
  }

  &__cta {
    @include boton-blanco;
    font-size: 0.85rem;
    padding: 0.6rem 1.2rem;
    margin-left: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 4px 12px rgba($color-red, 0.2);

    @media (min-width: 1024px) {
      font-size: 0.9rem;
      padding: 0.7rem 1.4rem;
      margin-left: 1rem;
    }
  }

  &__cta-icon {
    font-size: 1rem;
  }

  &__menu-toggle {
    display: flex;
    background: rgba($color-red, 0.1);
    border: 1px solid rgba($color-red, 0.3);
    border-radius: 8px;
    padding: 0.5rem;
    transition: all 0.3s ease;

    &:hover {
      background: rgba($color-red, 0.2);
      transform: scale(1.05);
    }

    @media (min-width: 768px) {
      display: none;
    }
  }

  &__hamburger {
    display: flex;
    flex-direction: column;
    width: 20px;
    height: 16px;
    justify-content: space-between;

    span {
      width: 100%;
      height: 2px;
      background: $color-lightred;
      border-radius: 1px;
      transition: all 0.3s ease;
      transform-origin: center;
    }

    &--active {
      span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }

      span:nth-child(2) {
        opacity: 0;
      }

      span:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -5px);
      }
    }
  }

  &__mobile-drawer {
    background: linear-gradient(180deg, $color-darkgray 0%, $color-gray 100%);
    backdrop-filter: blur(20px);
    border-right: 1px solid rgba($color-lightred, 0.2);
  }

  &__mobile-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 1rem;
    border-bottom: 1px solid rgba($color-lightred, 0.2);
  }

  &__mobile-title {
    font-family: $titulo;
    font-size: 1.3rem;
    font-weight: 700;
    color: $color-lightred;
    margin: 0;
  }

  &__mobile-close {
    color: $color-lightred;
    font-size: 1.5rem;
    background: rgba($color-red, 0.1);
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
  }

  &__mobile-list {
    padding: 1rem 0;
  }

  &__mobile-item {
    margin: 0.5rem 1rem;
    border-radius: 12px;
    background: rgba($color-black, 0.2);
    border: 1px solid rgba($color-lightred, 0.1);
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);

    &:hover {
      background: rgba($color-red, 0.1);
      border-color: rgba($color-red, 0.3);
      transform: translateX(8px);
    }

    &--cta {
      background: linear-gradient(45deg, rgba($color-red, 0.2), rgba($color-lightred, 0.1));
      border-color: $color-red;
      margin-top: 1rem;

      &:hover {
        background: linear-gradient(45deg, rgba($color-red, 0.3), rgba($color-lightred, 0.2));
        box-shadow: 0 4px 12px rgba($color-red, 0.3);
      }
    }
  }

  &__mobile-item-content {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem;
    width: 100%;
  }

  &__mobile-item-icon {
    font-size: 1.2rem;
    width: 2rem;
    text-align: center;
  }

  &__mobile-item-text {
    font-family: $first-font;
    font-size: 1.1rem;
    font-weight: 600;
    color: white;
  }

  &__mobile-decoration {
    position: absolute;
    bottom: 2rem;
    left: 1rem;
    right: 1rem;
    height: 3px;
    background: linear-gradient(90deg,
      transparent 0%,
      $color-red 25%,
      $color-lightred 50%,
      $color-red 75%,
      transparent 100%
    );
    border-radius: 2px;
    opacity: 0.7;
  }

  &__gradient-line {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg,
      transparent 0%,
      $color-red 25%,
      $color-lightred 50%,
      $color-red 75%,
      transparent 100%
    );
    opacity: 0.8;
    animation: shimmer 3s ease-in-out infinite;
  }
}

@keyframes shimmer {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}
</style>
