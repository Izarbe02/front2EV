
<template>
    <section class="homepage">
      <div class="homepage__container">

        <div class="homepage__carousel">
          <v-carousel cycle height="400">
            <v-carousel-item
              v-for="(item, i) in carouselItems"
              :key="i"
              :src="item.src"
            ></v-carousel-item>
          </v-carousel>
        </div>
  

        <div class="homepage__calendar">
          <v-sheet height="600">
            <v-calendar
              ref="calendar"
              :events="events"
              color="$color-red"
            ></v-calendar>
          </v-sheet>
        </div>
  

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
                {{ event.title }}
              </v-card-title>
              <v-card-text class="homepage__card-text">
                {{ event.description }}
              </v-card-text>
              <v-card-actions class="homepage__card-actions">
                <v-btn color="red" >Ver Detalles</v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'Homepage',
    data() {
      return {
        carouselItems: [
          { src: 'https://source.unsplash.com/random/800x400?event1' },
          { src: 'https://source.unsplash.com/random/800x400?event2' },
          { src: 'https://source.unsplash.com/random/800x400?event3' }
        ],
        events: [
          {
            title: 'Concierto de Rock',
            description: 'Disfruta de la mejor música en vivo en un ambiente único.',
            image: 'https://source.unsplash.com/random/400x200?rock'
          },
          {
            title: 'Feria de Arte',
            description: 'Exposición de los mejores artistas locales.',
            image: 'https://source.unsplash.com/random/400x200?art'
          },
          {
            title: 'Taller de Cocina',
            description: 'Aprende nuevas recetas y técnicas culinarias.',
            image: 'https://source.unsplash.com/random/400x200?cooking'
          }
        ]
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
  