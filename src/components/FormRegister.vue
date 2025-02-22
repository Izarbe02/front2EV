<script lang="ts" setup>

import { useUsuariosStore } from '@/stores/usuarios'
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

const usuariosStore = useUsuariosStore()
const router = useRouter()

const username = ref("");
const contrasenia = ref("");


const usernameRules = [
  (value: string) => (value.length >= 0) || "Rellena este campo"
];

const contraseniaRules = [
  (value: string) => (value.length >= 0) || "Rellena este campo"
];



const registrarUsuario = async () => {
  await usuariosStore.RegisterUser(username.value, contrasenia.value);

  if (usuariosStore.currentUser) {
    router.push("/homepage");
  }
};
  

</script>


<template>
  <v-sheet class="mx-auto" width="300">
    <v-form fast-fail @submit.prevent="loginUser">
      <v-text-field
        v-model="username"
        :rules="usernameRules"
        label="Usuario"
      ></v-text-field>

      <v-text-field
        v-model="contrasenia"
        :rules="contraseniaRules"
        label="Contraseña"
        type="password"
      ></v-text-field>

      <v-btn class="mt-2" type="submit" block color="primary">Iniciar sesión</v-btn>

      <!-- Mensaje de error si las credenciales son incorrectas -->
      <v-alert v-if="usuariosStore.errorMessage" type="error" class="mt-2">
        {{ usuariosStore.errorMessage }}
      </v-alert>
    </v-form>
  </v-sheet>
</template>



<style lang="scss">
@import "@/assets/styles/_variables.scss";
@import "@/assets/styles/_mixins.scss";
.mx-auto{
    margin-top: 15%;
    margin-bottom: 15%;
}
</style>