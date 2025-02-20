<script setup lang="ts">
  const fecha: Date = new Date();
</script>


<template>
  <div class="evento-container">
    <h1 class="titulo">EVENTOS</h1>
    <div class="evento-container__tarjetas">
    <div class="evento-card">
      <img :src="imagen" alt="Evento" class="evento-card__imagen" />

      <div class="evento-card__contenido">
        <p class="evento-card__titulo">Nombre Evento</p>

        <div class="evento-card__info">
          <span class="evento-card__fecha">
            {{ fecha.toLocaleDateString("es-ES", { weekday: 'long', day: '2-digit', month: 'short' }) }},
            {{ fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
          </span>
          <span class="evento-card__localizacion">
            SVG2
          </span>
        </div>

        <button class="evento-card__boton">Saber más</button>
      </div>
    </div>
  </div>
  </div>
</template>


<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";
@import "@/assets/styles/_mixins.scss";


.evento-container{
    padding: 2%;
    &__tarjetas{
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
}

.evento-card {
  background-color: #272525;
  border: 2px solid #292929;
  border-radius: 8px;
  color: #fff;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

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
    margin-top: 5%;
    font-size: 24px;
    text-align: center;
    margin-bottom: 30px;
    color: #fff9f9;
    text-shadow: 2px 2px 5px rgba(255, 5, 5, 0.7);
    width: 100%;
    padding: 10px;
    font-weight: 500;
  }

  &__info {
    font-size: 1.2rem;
    color: #bbb;
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 10px;
  }


  &__boton {
    padding: 8px;
     border-radius: 5px;
    @include boton-rojo;

  }
  @media (min-width: 768px){
    .eventos-container__tarjetas{
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
      margin-bottom: 50px;
    }
  }
}
</style>