<template>
  <section class="homepage">
    <div class="homepage__container">

      <!-- Carrusel de imagenes -->
      <div class="homepage__carousel">
        <v-carousel cycle height="400">
          <v-carousel-item
            v-for="(item, i) in carouselItems"
            :key="i"
            :src="item.src"
          ></v-carousel-item>
        </v-carousel>
      </div>

      <!-- Tarjetas de proximos eventos -->
      <div class="homepage__events">
        <h2 class="homepage__title">Próximos Eventos</h2>
        <div class="homepage__cards">
          <v-card
            v-for="(event, index) in events"
            :key="index"
            class="homepage__card"
          >
            <img :src="event.enlace" class="homepage__card-image"></img>
            <v-card-title class="homepage__card-title">
              {{ event.nombre }}
            </v-card-title>
            <v-card-text class="homepage__card-text">
              {{ event.descripcion }}
            </v-card-text>
            <v-card-actions class="homepage__card-actions">
             <RouterLink :to="`/EventoDetalle?id=${event.id}`" class="evento-card__boton">
              Saber más
            </RouterLink>

            </v-card-actions>
          </v-card>
        </div>
      </div>

    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useEventosStore } from "@/stores/eventos";
import EventoDto from "@/stores/dtos/evento.dto";

export default defineComponent({
  name: "Homepage",
  setup() {
    const store = useEventosStore();
    const events = ref<EventoDto[]>([]);

    // Lista de imagenes del carrusel
    const carouselItems = ref([
      { src: "https://imagenes.heraldo.es/files/image_990_auto/files/fp/uploads/imagenes/2024/04/12/con-imagen-afterpunk-y-trajes-hechos-en-casa-toco-john-landis-fans-con-santi-rex-al-frente-al-fondo-luis-linacero.r_d.1371-843.jpeg" },
      { src: "https://cdn.aragonmusical.com/wp-content/uploads/2016/09/Viva-Belgrado-660x330.jpg" },
      { src: "https://imagenes.heraldo.es/files/image_990_auto/uploads/imagenes/2024/04/13/jaime-berdejo-alma-de-la-muestra-de-pop-rock-y-otros-rollos-se-toma-un-respiro.jpeg" },
      { src: "https://cdn.aragonmusical.com/wp-content/uploads/2016/09/Viva-Belgrado-660x330.jpg" },
      { src: "https://imagenes.heraldo.es/files/image_990_auto/uploads/imagenes/2024/04/13/cincuenta-grupos-locales-alguno-mas-curtido-otros-totalmente-desconocidos-e-integrados-por-adolescentes-que-solo-habian-actuado-en-colegios-o-institutos-subieron-al-escenario-en-la-muestra-de-pop-rock-y-otros-rollos-zara.jpeg" },
      { src: "https://imagenes.heraldo.es/files/image_990_auto/uploads/imagenes/2024/04/13/john-landis-fans-muestra-de-pop-rock-y-otros-rollos-zaragoza-1984.jpeg" },
      { src: "https://imagenes.heraldo.es/files/image_990_auto/uploads/imagenes/2024/04/12/principal-izquierda-con-luis-urko-que-luego-montaria-el-mitico-bar-paradis-al-micro-a-la-guitarra-fabian-simon.jpeg" }
    ]);

    // Cargar los proximos eventos al montar el componente
    onMounted(async () => {
      await store.proximosEventos();
      events.value = store.eventosProximos;
    });

    return {
      events,
      carouselItems
    };
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
@import "@/assets/styles/_mixins.scss";

.homepage {
  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 1rem;
    max-width: 1200px;
    margin: 0 auto;
    margin-top: 5%;
  }

  &__carousel,
  &__calendar {
    width: 100%;
    max-width: 1200px;
  }

  &__events {
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  &__title {
    @include titulo-evento;
    text-align: center;
    text-shadow: 0px 0px 10px $color-black, 0px 0px 20px $color-black;
  }

  &__cards {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    @include desktop {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
  &__card {
    width: 300px; 
    height: 450px; 
    margin: 0 auto;
    background-color: rgb(247, 247, 247);
    display: flex;
    flex-direction: column;
    justify-content: space-between; 
    border-radius: 10px;
    overflow: hidden; 

    @include desktop {
      width: 30%;
      margin: 1%;
    }
  }

  &__card-image {
    width: 100%;
    height: 50%;
    object-fit: cover; 
  }

  &__card-title {
    font-family: $first-font;
    font-size: 1.4rem;
    color: $color-darkgray;
    padding: 10px;
    text-align: center;
  }

  &__card-text {
    font-size: 1.0rem;
    color: $color-gray;
    padding: 14px;
    text-align: center;
    flex-grow: 1; 
  }

  &__card-actions {
    display: flex;
    justify-content: center;
    padding: 10px;
  }

  .evento-card__boton {
    text-decoration: none;
    background-color: black;
    @include boton-rojo;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    display: inline-block;
    width: 80%;
  }}
</style>
