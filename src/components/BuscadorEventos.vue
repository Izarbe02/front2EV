<script setup lang="ts">
import { ref } from "vue";
import { useEventosStore } from "@/stores/eventos";

const eventosStore = useEventosStore();
const busqueda = ref("");

// Función para buscar cuando se presiona el botón
const buscar = () => {
  eventosStore.buscadorEvento(busqueda.value);
};
</script>

<template>
  <div class="buscador">
    <input
      v-model="busqueda"
      type="text"
      placeholder="Buscar eventos..."
      class="buscador__input"
    />
    <button @click="buscar" class="buscador__boton">Buscar</button>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";

.buscador {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin-top: 30%;
  @media (min-width: 768px) {
    margin-top: 20%;
  }
}

.buscador__input {
  width: 100%;
  max-width: 280px;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #272525;
  color: white;
}

.buscador__input::placeholder {
  color: #bbb;
}

.buscador__boton {
  padding: 10px 15px;
  background-color: #000;
  color: $color-lightred;
  border: 1px solid $color-red;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.buscador__boton:hover {
  background-color: #d62839;
}
</style>
