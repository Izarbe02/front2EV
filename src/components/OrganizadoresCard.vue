<script setup lang="ts">
import { onMounted } from "vue";
import { useOrganizadoresStore } from "@/stores/organizadores";


const store = useOrganizadoresStore();
const { organizadores, findAll } = store;


// Cargar productos al montar el componente
onMounted(() => {
  findAll();
});

</script>

<template>
  <div class="organizador-container">
    <h1 class="organizador-container__titulo">ORGANIZADORES</h1>
    <div class="organizador-container__tarjetas">
      <div v-for="organizador in organizadores" :key="organizador.id" class="organizador-card">
        <img :src="organizador.enlace" :alt="organizador.nombre" class="organizador-card__imagen" />
        <div class="organizador-card__contenido">
          <p class="organizador-card__titulo">{{ organizador.nombre }}</p>

          <div class="organizador-card__info">
            <span class="organizador-card__localizacion">{{ organizador.ubicacion }}</span>
          </div>
          <RouterLink :to="`/OrganizadorDetalle?id=${organizador.id}`" class="organizador-card__boton">
              Saber más
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";
@import "@/assets/styles/_mixins.scss";

.organizador-container {
  padding: 2%;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__titulo {
    @include titulo-evento;
    text-align: center;
    text-shadow: 0 0 10px $color-black, 0 0 20px $color-black;
    font-size: 2.4rem;
    margin-bottom: 1.5rem;

    @media (min-width: 768px) {
      font-size: 3rem;
      margin-bottom: 2rem;
    }
  }

  &__tarjetas {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    justify-items: center;

    @media (min-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }
  }
}

.organizador-card {
  background: url("@/assets/Images/fondo1.jpg") no-repeat center center;
  background-size: cover;
  border: 2px solid $color-gray;
  border-radius: 8px;
  color: #fff;
  width: 100%;
  max-width: 430px;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 15px rgba(92, 92, 92, 0.7);
  }

  &__imagen {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 8px 8px 0 0;
  }

  &__contenido {
    padding: 1rem 1.5rem 2rem 1.5rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-between;
  }

  &__titulo {
    font-family: $first-font;
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 1rem;
    color: $color-whitered;
    text-shadow: 2px 2px 5px rgba(255, 5, 5, 0.7);
  }

  &__info {
    font-family: $first-font;
    font-size: 1.4rem;
    color: #838383;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  &__localizacion {
    display: block;
  }

  &__link {
    color: $color-lightred;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1rem;

    &:hover {
      color: $color-red;
      text-decoration: none;
    }
  }

  &__boton {
    @include boton-rojo;
    text-decoration: none;
    text-align: center;
    display: block;
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
    transition:  0.3s ease;
    margin-top: auto;

    &:hover {
      background-color: $color-lightred;
      color: #fff;
    }
  }
}
</style>
