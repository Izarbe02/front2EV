<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useUsuariosOrganizadoresStore } from "@/stores/usuarioOrganizador";
import { useUsuariosStore } from "@/stores/usuarios";
import type UsuarioOrganizadorDto from "@/stores/dtos/UsuarioOrganizador.dto";
import type OrganizadorDto from "@/stores/dtos/organizador.dto";

const usuariosStore = useUsuariosStore();
const usuariosOrganizadoresStore = useUsuariosOrganizadoresStore();

const usuario = computed(() => usuariosStore.usuarioLogeado);
const organizadoresSeguidos = ref<OrganizadorDto[]>([]);

const cargarOrganizadores = async () => {
  if (usuario.value?.id) {
    await usuariosOrganizadoresStore.cargarOrganizadoresSeguidos(usuario.value.id);
    organizadoresSeguidos.value = usuariosOrganizadoresStore.organizadoresSeguidos;
  }
};

const dejarDeSeguir = async (idOrganizador: number) => {
  if (!usuario.value?.id) return;

  const dto: UsuarioOrganizadorDto = {
    idUsuario: usuario.value.id,
    idOrganizador
  };

  await usuariosOrganizadoresStore.unfollowOrganizador(dto);
  await cargarOrganizadores();
};

onMounted(() => {
  cargarOrganizadores();
});
</script>

<template>
  <div class="organizador-lista">
    <h2 class="organizador-lista__titulo">Organizadores que sigues</h2>

    <div v-if="organizadoresSeguidos.length === 0" class="organizador-lista__vacio">
      <p>No estás siguiendo a ningún organizador.</p>
    </div>

    <div v-else class="organizador-lista__grid">
      <div
        v-for="org in organizadoresSeguidos"
        :key="org.id"
        class="organizador-card"
      >
        <img
          :src="org.enlace"
          :alt="org.nombre"
          class="organizador-card__imagen"
        />
        <div class="organizador-card__info">
          <RouterLink
            :to="`/OrganizadorDetalle?id=${org.id}`"
            class="organizador-card__nombre"
          >
            {{ org.nombre }}
          </RouterLink>
          <p class="organizador-card__ubicacion">📍 {{ org.ubicacion }}</p>
          <p class="organizador-card__email">📧 {{ org.email }}</p>
          <button
            class="organizador-card__boton"
            @click="dejarDeSeguir(org.id)"
          >
            Dejar de seguir
          </button>
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
 background: url("@/assets/Images/fondo1.jpg") no-repeat center center;
  background-size: cover;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
   border: 2px solid #951f1f;
  border-radius: 8px;

  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

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
    display: block;
    font-size: 1.5rem;
    font-family: $titulo;
    margin-bottom: 0.5rem;
    color: $color-lightred;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  &__ubicacion,
  &__email {
    font-size: 1rem;
    font-family: $first-font;
    color: $color-lightgray;
  }

  &__boton {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: $color-red;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-family: $first-font;
    font-weight: bold;

    &:hover {
      background-color: $color-lightred;
      color: black;
    }
  }
}
</style>
