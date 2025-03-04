<template>
  <section class="homepage">
    <div class="homepage__container">

      <!-- Carrusel de imágenes -->
      <div class="homepage__carousel">
        <v-carousel cycle height="400">
          <v-carousel-item
            v-for="(item, i) in carouselItems"
            :key="i"
            :src="item.src"
          ></v-carousel-item>
        </v-carousel>
      </div>

      <!-- Calendario de eventos -->
      <div class="homepage__calendar">
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            :events="events"
            color="$color-red"
          ></v-calendar>
        </v-sheet>
      </div>

      <!-- Tarjetas de próximos eventos -->
      <div class="homepage__events">
        <h2 class="homepage__title">Próximos Eventos</h2>
        <div class="homepage__cards">
          <v-card
            v-for="(event, index) in events"
            :key="index"
            class="homepage__card"
          >
            <v-img :src="event.image" class="homepage__card-image"></v-img>
            <v-card-title class="homepage__card-title">
              {{ event.nombre }}
            </v-card-title>
            <v-card-text class="homepage__card-text">
              {{ event.descripcion }}
            </v-card-text>
            <v-card-actions class="homepage__card-actions">
              <v-btn color="red">Ver Detalles</v-btn>
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
import { EventoDto } from "@/stores/dtos/evento.dto";

export default defineComponent({
  name: "Homepage",
  setup() {
    const store = useEventosStore();
    const events = ref<EventoDto[]>([]);

    // Lista de imágenes del carrusel
    const carouselItems = ref([
      { src: "https://i.pinimg.com/736x/19/35/03/1935039f7bb9856a161b4c398b85adf7.jpg" },
      { src: "https://i.pinimg.com/736x/19/35/03/1935039f7bb9856a161b4c398b85adf7.jpg" },
      { src: "https://i.pinimg.com/736x/19/35/03/1935039f7bb9856a161b4c398b85adf7.jpg" }
    ]);

    // Cargar los próximos eventos al montar el componente
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
    font-family: $first-font;
    color: $color-darkgray;
    text-align: center;
    @include titulo-evento;
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
    width: 90%;
    margin: 0 auto;
    @include desktop {
      width: 30%;
      margin: 1%;
    }
  }

  &__card-image {
    height: 200px;
    object-fit: cover;
  }

  &__card-title {
    font-family: $first-font;
    font-size: 1.2rem;
    color: $color-darkgray;
  }

  &__card-text {
    font-size: 0.9rem;
    color: $color-gray;
  }

  &__card-actions {
    display: flex;
    justify-content: center;
  }
}
</style>
