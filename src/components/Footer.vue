<script setup lang="ts">
</script>

<template>
  <v-footer class="footer">
    <v-container class="footer__container">
      <!-- Logo y copyright -->
      <div class="footer__section footer__section--top">
        <v-img src="/logo.png" alt="Logo" class="footer__logo" contain></v-img>
        <span class="footer__text">&copy; 2025 Mi Empresa. Todos los derechos reservados.</span>
      </div>

      <!-- Enlaces -->
      <div class="footer__section footer__section--middle">
        <v-row justify="center" class="footer__links">
          <v-col cols="auto">
            <v-btn to="/aboutUs" class="footer__link">About us</v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn to="/eventos" class="footer__link">Eventos</v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn to="/organizadores" class="footer__link">Organizadores</v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn to="/administrador" class="footer__link">Gestión</v-btn>
          </v-col>
        </v-row>
      </div>

      <!-- Redes sociales -->
      <div class="footer__section footer__section--bottom">
        <v-row justify="center" class="footer__socials">
          <v-col cols="auto">
            <v-btn icon class="footer__social-button">
              <img src="../assets/Images/x.png" to="/login" alt="ss" class="footer_rrss-logo" />
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn icon class="footer__social-button">
              <img src="../assets/Images/instagram.png" to="/login" alt="ss" class="footer_rrss-logo" />
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn icon class="footer__social-button">
              <a href="https://www.youtube.com/watch?v=Zcb8yPEItwA" target="_blank" rel="noopener noreferrer">
                <img src="../assets/Images/youtube.png" alt="YouTube" class="footer_rrss-logo" />
              </a>
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-footer>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
@import "@/assets/styles/_mixins.scss";

.footer {
  background: $color-gray;
  padding: 16px 0;
  display: flex;
  width: 100%;
  position: relative;
  bottom: 0;
  left: 0;
  font-family: $first-font;

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 16px;
  }

  &__section {
    width: 100%;
  }

  &__links,
  &__socials {
    display: flex;
    justify-content: center;
    gap: 16px;
  }

  &__logo {
    height: 40px;
  }

  &__text {
    font-size: 24px;
    color: $color-lightred;
  }

  &__link {
    font-size: 18px;
    color: $color-lightred;
    background: $color-lightgray;
    text-transform: none;
    transition: transform 0.2s ease, background-color 0.3s ease, color 0.3s ease;

    &:hover {
      color: $color-whitered;
      transform: scale(1.05);
      background-color: $color-red;
    }
  }

  &__social-button {
    @include boton-gris;
    transition: transform 0.2s ease, background-color 0.3s ease;

    &:hover {
      transform: scale(1.05);
      background-color: $color-red;
    }
  }

  @media (max-width: 768px) {
    padding: 12px 0;

    .footer__text,
    .footer__link {
      font-size: 12px;
    }
  }
}
</style>
