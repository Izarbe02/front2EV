<template>
    <section class="about">
      <div class="about__container">
        <h2 class="about__title">Nuestra Misión</h2>
        <div class="about__block about__card">
      
          <div class="about__image about__image--small">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Sioux-edinburgh80.jpg" alt="Sobre Nosotros" />
            
          </div>
          <div class="about__content">
            <p class="about__text">
              Somos una plataforma dedicada a la difusión de eventos y la comunicación entre colectivos en Zaragoza. 
              Buscamos fortalecer el tejido social permitiendo a pequeños locales y comercios compartir sus eventos, 
              conectando a las personas con la cultura y el ocio local. Además, proporcionamos un espacio de interacción 
              donde los ciudadanos pueden descubrir nuevas iniciativas, participar en actividades y fortalecer la comunidad.
            </p>
          </div>
        </div>
        <h2 class="about__title">Nuestra Visión</h2>
        <div class="about__block about__block--reverse about__card">
          <div class="about__image">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Sioux-edinburgh80.jpg" alt="Nuestra Visión" />
            
          </div>
          <div class="about__content">
            <p class="about__text">
              Nuestro objetivo es fomentar la participación activa, ofreciendo un espacio accesible donde los usuarios 
              puedan descubrir eventos sin necesidad de registrarse, mientras los organizadores tienen control total sobre 
              la gestión de sus actividades. Creemos en la inclusión y la accesibilidad, brindando una plataforma 
              intuitiva que facilite la conexión entre organizadores y asistentes, promoviendo eventos culturales, 
              sociales y educativos en Zaragoza.
            </p>
          </div>
        </div>
        <h2 class="about__title">Nuestro Compromiso</h2>
        <div class="about__block about__card">
          <div class="about__image">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Sioux-edinburgh80.jpg" alt="Nuestro Compromiso" />
            
          </div>
          <div class="about__content">
            <p class="about__text">
              Creemos en la importancia de la cultura y el ocio accesible. Por ello, trabajamos para proporcionar un 
              entorno inclusivo que impulse el crecimiento de la comunidad a través de eventos significativos. 
              Nuestra visión es contribuir al desarrollo social y cultural, creando un ecosistema donde las personas 
              puedan descubrir, compartir y disfrutar de experiencias únicas que fortalezcan el sentido de pertenencia y la identidad local.
            </p>
          </div>
        </div>
      </div>
    </section>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
@import "@/assets/styles/_mixins.scss";

.about {
 
  
  &__container {
    
    border: 2px solid $color-red;
    box-shadow: 0 0 10px $color-red;
    background: url("@/assets/images/fondo1.jpg") no-repeat center center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    max-width: 1200px;
    margin: 0 auto;
    
    @include desktop {
      gap: 4rem;
    }
  }
  
  &__block {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
    width: 100%;
    max-width: 350px;
    padding: 1rem;
    
    @include desktop {
      flex-direction: row;
      max-width: 1000px;
      padding: 2rem;
      text-align: left;
      max-width: 800px;
    }
  }
  
  &__block--reverse {
    @include desktop {
      flex-direction: row-reverse;
      max-width: 1000px;
      padding: 2rem;
    }
  }

  &__card {

  
    margin-bottom: 2rem;
    @include desktop {
      max-width: 1100px;
      padding: 50px;
      padding: 40px;
      padding: 30px;
    }
    
    padding: 20px;
    border-radius: 10px;
    transition: transform 0.3s ease-in-out;
    width: 90%;
    max-width: 400px;
    
    &:hover {
      transform: scale(1.05);
    }
  }
  
  &__image {
    @include desktop {
      max-width: 900px;
    }
    margin-top: 2rem;
    @include desktop {
      max-width: 1000px;
    }
    width: 100%;
    max-width: 100%;
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
    max-width: 100%;
    padding: 0 1rem;
  }
  
  &__title {
    font-size: 2.2rem;
    @include desktop {
      font-size: 2.8rem;
    }
    margin-top: 2rem;
    font-family: $first-font;

    color: $color-darkgray;
    font-size: 1.8rem;
    text-align: center;
    @include titulo-evento;
  }
  
  &__text {
    font-size: 1.2rem;
    @include desktop {
      font-size: 1.4rem;
    }
    font-family: $first-font;
    color: $color-whitered;
    font-size: 1rem;
    line-height: 1.6;
  }
}
</style>
