<script setup lang="ts">
import { onMounted } from "vue";
import { useProductosStore } from "@/stores/productos";
import { useCategoriaProductosStore } from "@/stores/categoriaProductos";


const store = useProductosStore();
const { productos, findAll } = store;
const storeCategoriaProducto = useCategoriaProductosStore();
const { categorias, findAll: findAllCategoriaProducto } = storeCategoriaProducto;


// Cargar productos al montar el componente
onMounted(() => {
  findAll();
});

const obtenerCategoria = (idCategoria: number) => {
  const categoriaEncontrada = categorias.find(c => c.id === idCategoria);
  return categoriaEncontrada ? categoriaEncontrada.nombre : "Sin categoría";
};
</script>

<template>
  <div class="producto-container">
    <h1 class="titulo">TODOS LOS PRODUCTOS</h1>
    <div class="producto-container__tarjetas">
      <div v-for="producto in productos" :key="producto.id" class="producto-card">
        <img :src="producto.imagen" alt="Imagen del producto" class="producto-card__imagen"/>

        <div class="producto-card__contenido">
          <p class="producto-card__titulo">{{ producto.nombre }}</p>

          <div class="producto-card__info">
            <span class="producto-card__categoria">
              {{ obtenerCategoria(producto.idCategoria) }}
            </span>
            
            <span class="producto-card__localizacion">
              {{ producto.ubicacion }}
            </span>
            
          </div>

          <button class="producto-card__boton">Saber más</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";
@import "@/assets/styles/_mixins.scss";

.producto-container {
  padding: 2%;

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
}

.producto-card {
  background-color: #272525;
  border: 2px solid #292929;
  border-radius: 8px;
  color: #fff;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  width: 100%;
  max-width: 370px;
  display: flex;
  flex-direction: column;
  
  

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
    font-size: 30px;
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

  &__boton {
    font-family: $titulo;
    padding: 8px;
    border-radius: 5px;
    @include boton-rojo;
  }

  @media (min-width: 768px) {
  .producto-container__tarjetas {
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 20px;
    margin-bottom: 50px;
  }
}

}
@media (min-width: 768px) {
  .producto-container__tarjetas {
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 20px;
    margin-bottom: 50px;
  }
}
</style>
