<template>
<div class="tituloCont">
    <h2 class="txto">Difunde tus eventos, encuentra actividades y apoya iniciativas en Zaragoza. </h2><br>
    <h1 class="txtoB">Cultura, activismo, comunidad</h1>
 </div>


  <div class="carousel">
    <v-carousel cycle height="400" hide-delimiters>
      <template v-slot:prev="{ props }">
        <v-btn
          class="carousel__button carousel__button--prev"
          @click="props.onClick"
        >
          ❮
        </v-btn>
      </template>


      <template v-slot:next="{ props }">
        <v-btn
          class="carousel__button carousel__button--next"
          @click="props.onClick"
        >
          ❯
        </v-btn>
      </template>

      <v-carousel-item v-for="(item, i) in items" :key="i">
        <div class="carousel__item">

          <v-img :src="item.src" cover class="carousel__image"></v-img>

          <div class="carousel__text">
            {{ item.text }}
          </div>

          <v-btn
            class="carousel__buttonVerMas"
            color="primary"
            variant="flat"
            :to="item.url"
          >
            Ver más
          </v-btn>
        </div>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const items = ref([
{
    src: "https://i.pinimg.com/736x/dd/23/a9/dd23a956a354682773e16b759b133226.jpg",
    url: "/eventos",
    text: "Visita nuestros eventos",
  },
  {
    src: "https://cdn.aragonmusical.com/wp-content/uploads/2016/09/Viva-Belgrado-660x330.jpg",
    url: "/organizadores",
    text: "Conoce nuestros organizadores",
  },
  {
    src: "https://i.pinimg.com/736x/fc/5e/5a/fc5e5a9fb83a8b202cc4ac90252cb770.jpg",
    url: "/aboutus",
    text: "Sobre nosotros",
  }

]);
</script>
<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";

.carousel {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin-top: 21%;
  @media (min-width: 768px){
    max-width: 1200px;
    margin-top: 7%;
  }
}

.tituloCont {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  text-align: center;
  padding: 0 10px;
  width: 100%;
  max-width: 1000px;
  margin-bottom: 50px;

  @media (min-width: 768px) {
    top: 20px;
  }
}

.txto {
  font-family: $first-font;
  color: rgb(180, 1, 1);
  margin: 0;
}

.txtoB {
  font-family: $titulo;
  font-weight: bold;
  color: red;
  text-shadow: 1px 1px 1px rgba(187, 187, 187, 0.7);
  margin: 0;
}

.carousel__item {
  position: relative;
  width: 100%;
  height: 100%;
}

.carousel__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel__text {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.6);
  color: $color-red;
  padding: 2px 8px;
  font-size: 180%;
  font-weight: bold;
  border-radius: 5px;
  font-family: $first-font;
  @media (min-width: 768px) {
    padding: 8px 12px;
    font-size: 200%;
    top: 10px;
    left: 10px;
  }
}

.carousel__buttonVerMas {
  position: absolute;
  bottom: 6%;
  left: 6%;
  background-color: #000000e1 !important;
  color: $color-lightred !important;
  border: 2px solid $color-red;
  border-radius: 7px !important;
  font-family: $first-font;
  font-size: 110%;
  @media (min-width: 768px) {
    font-size: 120%;
    bottom: 6%;
    left: 6%;
    transform: translateX(-50%);
  }
}

.carousel__button {
  position: absolute;
  background-color: rgba(0, 0, 0, 0) !important;
  color: rgba($color: #c5c5c5, $alpha: 1.0) !important;
  width: 50px !important;
  height: 50px !important;
  border-radius: 50%;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
  box-shadow: none !important;
}

.carousel__button--prev {
  left: 10px;
}

.carousel__button--next {
  right: 10px;
}

.carousel__button:hover {
  background-color: rgba(0, 0, 0, 0.918) !important;
  color: $color-lightred !important;
}
</style>
