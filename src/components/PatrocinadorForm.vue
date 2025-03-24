<script lang="ts" setup>
import { ref } from 'vue';
import { useUsuariosStore } from '@/stores/usuarios';
import type UsuarioDto from '@/stores/dtos/usuario.dto'; // Importa el DTO

const usuariosStore = useUsuariosStore();

// Variables reactivas para los datos del usuario
const username = ref("");
const nombre = ref("");
const email = ref("");
const ubicacion = ref("");
const contrasenia = ref("");

// Reglas de validación para Vuetify
const requiredRule = [(v: string) => !!v || "Campo obligatorio"];
const emailRule = [
  (v: string) => !!v || "Campo obligatorio",
  (v: string) => /.+@.+\..+/.test(v) || "Email inválido"
];

// Función para registrar usuario usando el DTO
const registrarUsuario = async () => {
  const usuario: UsuarioDto = {
    id: 0,
    username: username.value,
    nombre: nombre.value,
    email: email.value,
    ubicacion: ubicacion.value,
    contrasenia: contrasenia.value,
    idRol: 3
  };

  await usuariosStore.createUsuario(usuario);
};
</script>

<template>
  <v-container class="registro">
    <v-sheet class="registro__sheet" elevation="8">
      <h2 class="registro__title">Registro de Usuario</h2>
      <p class="registro__subtitle">Completa tus datos para registrarte.</p>

      <v-form @submit.prevent="registrarUsuario" class="registro__form">
        <v-text-field v-model="username" :rules="requiredRule" label="Usuario" class="registro__input"></v-text-field>
        <v-text-field v-model="nombre" :rules="requiredRule" label="Nombre Completo" class="registro__input"></v-text-field>
        <v-text-field v-model="email" :rules="emailRule" label="Email" type="email" class="registro__input"></v-text-field>
        <v-text-field v-model="ubicacion" :rules="requiredRule" label="Ubicación" class="registro__input"></v-text-field>
        <v-text-field v-model="contrasenia" :rules="requiredRule" label="Contraseña" type="password" class="registro__input"></v-text-field>

        <v-btn type="submit" block class="registro__button">Registrarse</v-btn>
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
