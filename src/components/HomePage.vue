<template>
  <section class="homepage">
    <div class="homepage__container">

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

    // Cargar los proximos eventos al montar el componente
    onMounted(async () => {
      await store.proximosEventos();
      events.value = store.eventosProximos;
    });

    return {
      events
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
    margin-top: 1%;
  }

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
