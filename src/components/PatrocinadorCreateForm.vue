<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePatrocinadorStore } from '@/stores/patrocinadores';
import { useOrganizadoresStore } from '@/stores/organizadores';
import type PatrocinadorDto from '@/stores/dtos/patrocinadores.dto';

const router = useRouter();
const patrocinadoresStore = usePatrocinadorStore();
const organizadoresStore = useOrganizadoresStore();

// Variables del formulario
const nombre = ref('');
const descripcion = ref('');
const logo = ref('');
const contacto = ref('');
const idOrganizador = ref<number | null>(null);

// Cargar organizadores desde el store al montar el componente
onMounted(() => {
  organizadoresStore.findAll();
});

// Función para registrar patrocinador
const registrarPatrocinadores = async () => {
  const patrocinador: PatrocinadorDto = {
    id: 0,
    nombre: nombre.value,
    descripcion: descripcion.value,
    logo: logo.value,
    contacto: contacto.value,
    idOrganizador: idOrganizador.value ?? 0,
  };

  await patrocinadoresStore.createPatrocinador(patrocinador);
  router.push('/Patrocinadores');
};
</script>

<template>
  <v-container class="registro">
    <v-sheet class="registro__sheet" elevation="8">
      <h2 class="registro__title">Registro de Patrocinador</h2>
      <p class="registro__subtitle">Completa tus datos para registrarte.</p>

      <v-form @submit.prevent="registrarPatrocinadores" class="registro__form">
        <v-text-field v-model="nombre" label="Nombre" class="registro__input" />
        <v-text-field v-model="descripcion" label="Descripción" class="registro__input" />
        <v-text-field v-model="logo" label="Logo" class="registro__input" />
        <v-text-field v-model="contacto" label="Contacto" class="registro__input" />

        <v-select v-model="idOrganizador" :items="organizadoresStore.organizadores" item-title="nombre" item-value="id"
          label="Selecciona un Organizador" class="registro__input" :return-object="false" />

        <v-btn type="submit" block class="registro__button">Registrar</v-btn>
      </v-form>

      <div v-if="organizadoresStore.errorMessage" class="registro__error">
        {{ organizadoresStore.errorMessage }}
      </div>
    </v-sheet>
  </v-container>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
@import "@/assets/styles/_mixins.scss";

.registro {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  &__sheet {
    padding: 24px;
    border-radius: 8px;
    background: rgba($color-black, 0.9);
    border: 2px solid $color-red;
    width: 100%;
    max-width: 400px;
    text-align: center;
    margin-bottom: 50px;
  }

  &__title {
    color: white;
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  &__subtitle {
    color: $color-lightred;
    font-size: 17px;
    margin-bottom: 16px;
  }

  &__form {
    background: url('@/assets/Images/fondo1.jpg') no-repeat center center;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__input {
    background: transparent;
    border-bottom: 2px solid $color-red;
    color: white;
    border-radius: 0;
    font-size: 18px;

    &::placeholder {
      color: $color-lightred;
    }
  }

  &__button {
    @include boton-rojo;
  }

  &__error {
    background: $color-lightred;
    color: $color-black;
    font-weight: bold;
    margin-top: 16px;
  }

  @media (max-width: 768px) {
    &__sheet {
      width: 90%;
    }
  }
}
</style>
