<template>
    <div class="carousel">
      <v-carousel cycle height="400">
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
        ></v-carousel-item>
      </v-carousel>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  
  const items = ref([
    { src: "https://imagenes.heraldo.es/files/image_990_auto/files/fp/uploads/imagenes/2024/04/12/con-imagen-afterpunk-y-trajes-hechos-en-casa-toco-john-landis-fans-con-santi-rex-al-frente-al-fondo-luis-linacero.r_d.1371-843.jpeg" },
    { src: "https://cdn.aragonmusical.com/wp-content/uploads/2016/09/Viva-Belgrado-660x330.jpg" },
    { src: "https://imagenes.heraldo.es/files/image_990_auto/uploads/imagenes/2024/04/13/jaime-berdejo-alma-de-la-muestra-de-pop-rock-y-otros-rollos-se-toma-un-respiro.jpeg" },
    { src: "https://cdn.aragonmusical.com/wp-content/uploads/2016/09/Viva-Belgrado-660x330.jpg" },
    { src: "https://imagenes.heraldo.es/files/image_990_auto/uploads/imagenes/2024/04/13/cincuenta-grupos-locales-alguno-mas-curtido-otros-totalmente-desconocidos-e-integrados-por-adolescentes-que-solo-habian-actuado-en-colegios-o-institutos-subieron-al-escenario-en-la-muestra-de-pop-rock-y-otros-rollos-zara.jpeg" },
    { src: "https://imagenes.heraldo.es/files/image_990_auto/uploads/imagenes/2024/04/13/john-landis-fans-muestra-de-pop-rock-y-otros-rollos-zaragoza-1984.jpeg" },
    { src: "https://imagenes.heraldo.es/files/image_990_auto/uploads/imagenes/2024/04/12/principal-izquierda-con-luis-urko-que-luego-montaria-el-mitico-bar-paradis-al-micro-a-la-guitarra-fabian-simon.jpeg" }
  ]);
  </script>
  
  <style scoped lang="scss">
  .carousel {
    width: 100%;
    max-width: 1200px;
  }
  </style>
  