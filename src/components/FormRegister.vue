<script lang="ts" setup>
import { ref } from 'vue';
import { useUsuariosStore } from '@/stores/usuarios';
import type UsuarioDto from '@/dto/UsuarioDto'; // Importa el DTO

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
  <v-container>
    <v-card class="pa-5" max-width="500" elevation="5">
      <v-card-title class="text-center text-h5">Registro de Usuario</v-card-title>

      <v-form @submit.prevent="registrarUsuario">
        <v-text-field v-model="username" :rules="requiredRule" label="Usuario"></v-text-field>
        <v-text-field v-model="nombre" :rules="requiredRule" label="Nombre Completo"></v-text-field>
        <v-text-field v-model="email" :rules="emailRule" label="Email" type="email"></v-text-field>
        <v-text-field v-model="ubicacion" :rules="requiredRule" label="Ubicación"></v-text-field>
        <v-text-field v-model="contrasenia" :rules="requiredRule" label="Contraseña" type="password"></v-text-field>

        <v-btn type="submit" block color="primary" class="mt-4">Registrarse</v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<style scoped>
.v-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
