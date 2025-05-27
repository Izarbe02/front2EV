<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useUsuariosOrganizadoresStore } from "@/stores/UsuarioOrganizador";
import { useUsuariosStore } from "@/stores/usuarios";


const usuariosStore = useUsuariosStore();
const usuariosOrganizadoresStore = useUsuariosOrganizadoresStore();

const usuario = usuariosStore.usuarioLogeado;
const organizadoresSeguidos = usuariosOrganizadoresStore.organizadoresSeguidos;

watch(
  () => usuario?.id,
  async (newId) => {
    if (newId) {
      await usuariosOrganizadoresStore.cargarOrganizadoresSeguidos(newId);
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="organizador-lista">
    <h2 class="organizador-lista__titulo">Organizadores que sigues</h2>

    <div v-if="organizadoresSeguidos.length === 0" class="organizador-lista__vacio">
      <p>No estás siguiendo a ningún organizador.</p>
    </div>

    <div v-else class="organizador-lista__grid">
      <div v-for="org in organizadoresSeguidos" :key="org.id" class="organizador-card">
        <img :src="org.enlace" :alt="org.nombre" class="organizador-card__imagen" />
        <div class="organizador-card__info">
          <h3 class="organizador-card__nombre">{{ org.nombre }}</h3>
          <p class="organizador-card__ubicacion">📍 {{ org.ubicacion }}</p>
          <p class="organizador-card__email">📧 {{ org.email }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";
.organizador-lista {
  padding: 2rem;
  text-align: center;

  &__titulo {
    font-family: $titulo;
    font-size: 2rem;
    color: $color-lightred;
    margin-bottom: 2rem;
  }

  &__vacio {
    color: $color-lightgray;
    font-family: $first-font;
    font-size: 1.2rem;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

.organizador-card {
  background-color: $color-darkgray;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  &__imagen {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  &__info {
    padding: 1rem;
    text-align: left;
    color: #fff;
  }

  &__nombre {
    font-size: 1.5rem;
    font-family: $titulo;
    margin-bottom: 0.5rem;
  }

  &__ubicacion,
  &__email {
    font-size: 1rem;
    font-family: $first-font;
    color: $color-lightgray;
  }
}
</style>
