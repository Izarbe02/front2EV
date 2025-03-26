<script setup lang="ts">
import { onMounted } from "vue";
import { usePatrocinadorStore } from "@/stores/patrocinadores.ts";


const store = usePatrocinadorStore();
const { patrocinadores, findAll } = store;


// Cargar productos al montar el componente
onMounted(() => {
  findAll();
});

</script>

<template>
  <div class="patrocinadores-container">
    <h1 class="titulo">Patrocinadores</h1>
    <button class="patrocinador-card__boton">
            <RouterLink :to="`/PatrocinadorCreateFormView`" class="patrocinador-card__link">
                Crear 
            </RouterLink>
          </button>
    <div class="patrocinadores-container__tarjetas">
      <div v-for="patrocinador in patrocinadores" :key="patrocinador.id" class="patrocinador-card">
        <img :src="patrocinador.logo" :alt="patrocinador.nombre" class="patrocinador-card__imagen" />
        <div class="patrocinador-card__contenido">
          <p class="patrocinador-card__titulo">{{ patrocinador.nombre }}</p>

          <div class="patrocinador-card__info">
            
            <span class="patrocinador-card__localizacion">
              {{ patrocinador.contacto }}
            </span>
          
          </div>
          <button class="patrocinador-card__boton">
            <RouterLink :to="`/patrocinadorForm?id=${patrocinador.id}`" class="patrocinador-card__link">
                Editar
            </RouterLink>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";
@import "@/assets/styles/_mixins.scss";

.patrocinadores-container {
  padding: 2%;
  margin-top: 17%;

  &__tarjetas {
    margin-top: 25px;
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr;
    justify-items: center;
    margin-bottom: 30px;
  }
}

h1 {
  @include titulo-evento;
  text-shadow: 0px 0px 10px $color-black, 0px 0px 20px $color-black;
}

.patrocinador-card {
  background-color: #272525;
  border: 2px solid #292929;
  border-radius: 8px;
  color: #fff;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  width: 100%;
  max-width: 370px;
  display: flex;
  flex-direction: column;
  border: 2px solid #3b0000;
  
  

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 0px 15px rgba(92, 92, 92, 0.7);
  }

  &__imagen {
    width: 100%;
    height: 200px;
    object-fit: cover;

  }

  &__contenido {
    padding: 12px;
  }

  &__titulo {
    font-family: $titulo;
    margin-top: 5%;
    font-size: 25px;
    text-align: center;
    margin-bottom: 30px;
    color: #fff9f9;
    text-shadow: 2px 2px 5px rgba(255, 5, 5, 0.7);
    width: 100%;
    padding: 10px;
    font-weight: 500;
  }

  &__info {
    font-family: $first-font;
    font-size: 1.2rem;
    color: #bbb;
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 10px;
  }

  &__link{
    text-decoration: none;
    color: $color-lightred;
  }

  &__boton {
    font-family: $titulo;
    padding: 8px;
    border-radius: 5px;
    @include boton-rojo;
  }


}
@media (min-width: 768px) {
  .patrocinadores-container{
    margin-top: 10px;
        &__tarjetas {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 20px;
            margin-bottom: 50px;
        }
    }
}
</style>
