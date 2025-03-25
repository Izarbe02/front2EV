<script lang="ts" setup>
import { ref } from 'vue';
import { usePatrocinadorStore } from '@/stores/patrocinadores';
import type PatrocinadorDto from '@/stores/dtos/patrocinador.dto'; // Importa el DTO

const patrocinadoresStore = usePatrocinadorStore();

// Variables reactivas 
const nombre = ref("");
const descripcion = ref("");
const logo = ref("");
const contacto = ref("");
const idOrganizador = ref("");

// Función para registrar patrocinador usando el DTO
const registrarPatrocinadores = async () => {
  const patrocinador: patrocinadorDto = {
    id: 0,
    nombre: nombre.value,
    descripcion: descripcion.value,
    logo: logo.value,
    contacto: contacto.value,
    idOrganizador: idOrganizador.value
  };

  await patrocinadoresStore.createPatrocinador(patrocinador);
};
</script>

<template>
  <v-container class="registro">
    <v-sheet class="registro__sheet" elevation="8">
      <h2 class="registro__title">Registro de Patrocinador</h2>
      <p class="registro__subtitle">Completa tus datos para registrarte.</p>

      <v-form @submit.prevent="registrarPatrocinador" class="registro__form">
        <v-text-field v-model="nombre" :rules="requiredRule" label="Nombre Completo" class="registro__input"></v-text-field>
        <v-text-field v-model="descripcion" :rules="emailRule" label="Email" type="email" class="registro__input"></v-text-field>
        <v-text-field v-model="logo" :rules="requiredRule" label="Ubicación" class="registro__input"></v-text-field>
        <v-text-field v-model="contacto" :rules="requiredRule" label="Contraseña" type="password" class="registro__input"></v-text-field>
        <v-text-field v-model="idOrganizador" :rules="requiredRule" label="idOrganizador" type="idOrganizador" class="registro__input"></v-text-field>

        <v-btn type="submit" block class="registro__button">Editar Organizador</v-btn>
      </v-form>
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
