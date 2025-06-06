<template>
    <section class="about">
      <div class="about__container">
        <div class="about__header">
          <h1 class="about__main-title">Sobre Nosotros</h1>
          <div class="about__divider"></div>
        </div>

        <div class="about__section">
          <h2 class="about__title">
            <span class="about__title-icon"></span>
            Nuestra Misión
          </h2>
          <div class="about__block about__card">
            <div class="about__image about__image--small">
              <div class="about__image-overlay"></div>
              <img src="https://humointernacional.com/wp-content/uploads/2024/07/Sal-del-Coche-5-Foto-Adri-G.-Lorenzo-@adriglorenzo-1200x800.jpg" alt="Sobre Nosotros" />
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
        </div>

        <div class="about__section">
          <h2 class="about__title">

            Nuestra Visión
          </h2>
          <div class="about__block about__block--reverse about__card">
            <div class="about__image">
              <div class="about__image-overlay"></div>
              <img src="https://zaragozacomerciojusto.org/wp-content/uploads/2017/01/pantera-rossa.jpg" alt="Nuestra Visión" />
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
        </div>

        <div class="about__section">
          <h2 class="about__title">
            Nuestro Compromiso
          </h2>
          <div class="about__block about__card">
            <div class="about__image">
              <div class="about__image-overlay"></div>
              <img src="https://i.pinimg.com/736x/d1/a6/e1/d1a6e13363b72972c97cd1f35dd420f5.jpg" alt="Nuestro Compromiso" />
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
      </div>
    </section>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
@import "@/assets/styles/_mixins.scss";

.about {
  min-height: 100vh;
  position: relative;

  &__container {
    border: 2px solid $color-red;
    box-shadow: 0 0 20px rgba($color-red, 0.3);
    background: url("@/assets/Images/fondo1.jpg") no-repeat center center;
    background-size: cover;
    background-attachment: fixed;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.15);
      pointer-events: none;
    }

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
    max-width: 1200px;
    margin: 0 auto;
    margin-top: 15%;
    padding: 3rem 1rem;
    position: relative;
    z-index: 1;

    @include desktop {
      gap: 4rem;
      margin-top: 5%;
      padding: 4rem 2rem;
    }
  }

  &__header {
    text-align: center;
    margin-bottom: 2rem;
  }

  &__main-title {
    font-size: 3rem;
    font-family: $first-font;
    color: $color-red;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

    @include desktop {
      font-size: 4rem;
    }
  }

  &__divider {
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, transparent, $color-red, transparent);
    margin: 0 auto;
    border-radius: 2px;
  }

  &__section {
    width: 100%;
    max-width: 1000px;
    margin-bottom: 2rem;
  }

  &__block {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 2rem;
    width: 100%;
    padding: 1rem;

    @include desktop {
      flex-direction: row;
      padding: 2rem;
      text-align: left;
      gap: 3rem;
    }
  }

  &__block--reverse {
    @include desktop {
      flex-direction: row-reverse;
    }
  }

  &__card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    margin-bottom: 2rem;
    padding: 2rem;
    border-radius: 20px;
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.1),
      0 0 0 1px rgba(255, 255, 255, 0.1);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;


    &::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(
        45deg,
        transparent,
        rgba(255, 255, 255, 0.1),
        transparent
      );
      transform: rotate(45deg);
      transition: all 0.6s ease;
      opacity: 0;
    }

    &:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow:
        0 20px 40px rgba(0, 0, 0, 0.15),
        0 0 0 1px rgba($color-red, 0.2);

      &::before {
        opacity: 1;
        transform: rotate(45deg) translate(50%, 50%);
      }
    }

    @include desktop {
      padding: 3rem;
    }
  }

  &__image {
    position: relative;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }

    @include desktop {
      flex: 1;
      max-width: 400px;
    }

    &--small {
      max-width: 300px;

      @include desktop {
        max-width: 350px;
      }
    }

    img {
      width: 100%;
      height: 250px;
      object-fit: cover;
      transition: transform 0.3s ease;

      @include desktop {
        height: 300px;
      }
    }
  }

  &__image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba($color-red, 0.1) 0%,
      transparent 50%,
      rgba($color-red, 0.05) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;

    .about__image:hover & {
      opacity: 1;
    }
  }

  &__content {
    flex: 1;
    padding: 0;

    @include desktop {
      padding: 0 1rem;
    }
  }

  &__title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    font-size: 2.2rem;
    font-family: $first-font;
    color: $color-darkgray;
    text-align: center;
    margin-bottom: 2rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);

    @include desktop {
      font-size: 2.8rem;
      justify-content: flex-start;
      text-align: left;
    }

    @include titulo-evento;
  }

  &__title-icon {
    font-size: 2rem;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));

    @include desktop {
      font-size: 2.5rem;
    }
  }

  &__text {
    font-size: 1.1rem;
    font-family: $first-font;
    color: #333;
    line-height: 1.8;
    text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);

    @include desktop {
      font-size: 1.3rem;
      line-height: 1.7;
    }


    &::first-letter {
      font-size: 1.5em;
      font-weight: bold;
      color: $color-red;
      float: left;
      line-height: 1;
      margin-right: 0.1em;
      margin-top: 0.1em;
    }
  }


  &__section {
    animation: fadeInUp 0.8s ease-out forwards;
    opacity: 0;
    transform: translateY(30px);

    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
    &:nth-child(4) { animation-delay: 0.6s; }
  }
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


@media (max-width: 768px) {
  .about {
    &__card {
      margin: 0 1rem 2rem;
      padding: 1.5rem;
    }

    &__main-title {
      font-size: 2.2rem;
    }

    &__title {
      font-size: 1.8rem;
      flex-direction: column;
      gap: 0.5rem;
    }
  }
}
</style>
