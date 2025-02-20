<template>
    <section class="about">
      <div class="about__container">
        <div class="about__block">
          <h2 class="about__title">Nuestra Misión</h2>
          <div class="about__image about__image--small">
            <a href="https://es.pinterest.com/pin/484207397417450655/" target="_blank">
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Sioux-edinburgh80.jpg" alt="Sobre Nosotros" />
            </a>
          </div>
          <div class="about__content">
            <p class="about__text">
              Somos una plataforma dedicada a la difusión de eventos y la comunicación entre colectivos en Zaragoza. 
              Buscamos fortalecer el tejido social permitiendo a pequeños locales y comercios compartir sus eventos, 
              conectando a las personas con la cultura y el ocio local.
            </p>
          </div>
        </div>
        <div class="about__block about__block--reverse">
          <h2 class="about__title">Nuestra Visión</h2>
          <div class="about__image">
            <a href="https://es.pinterest.com/pin/484207397417450655/" target="_blank">
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Sioux-edinburgh80.jpg" alt="Nuestra Visión" />
            </a>
          </div>
          <div class="about__content">
            <p class="about__text">
              Nuestro objetivo es fomentar la participación activa, ofreciendo un espacio accesible donde los usuarios 
              puedan descubrir eventos sin necesidad de registrarse, mientras los organizadores tienen control total sobre 
              la gestión de sus actividades.
            </p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script lang="ts">
  export default {
    name: "AboutUs",
  };
  </script>
  
  <style lang="scss" scoped>
  @import "@/assets/styles/_variables.scss";
  @import "@/assets/styles/_mixins.scss";
  
  .about {
    background: url("@/assets/images/fondo1.jpg") no-repeat center center;
    background-size: cover;
    padding: 2rem;
    
    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      
      @include desktop {
        gap: 4rem;
      }
    }
    
    &__block {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 1.5rem;
      
      @include desktop {
        flex-direction: row;
        text-align: left;
      }
    }
    
    &__block--reverse {
      @include desktop {
        flex-direction: row-reverse;
      }
    }
    
    &__image {
      width: 100%;
      max-width: 400px;
      border: 2px solid $color-red;
      
      &--small {
        max-width: 300px;
      }
      
      img {
        width: 100%;
        border-radius: 10px;
      }
    }
    
    &__content {
      max-width: 600px;
    }
    
    &__title {
      font-family: $first-font;
      color: $color-darkgray;
      font-size: 2rem;
      @include titulo-evento;
    }
    
    &__text {
      font-family: $first-font;
      color: $color-lightgray;
      font-size: 1rem;
      line-height: 1.6;
    }
  }
  </style>
  