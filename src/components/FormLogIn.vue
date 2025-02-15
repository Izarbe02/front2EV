<script lang="ts">
import { useUsuariosStore } from '@/stores/usuarios'

const store = useUsuariosStore()

const userName = ref("");
const contrasenia = ref("");

// Reglas de validación
const userNameRules = [
  (v: string) => !!v || "Este campo es obligatorio",
  (v: string) => (v && v.length >= 2) || "Debe tener formato válido",
];

const contraseniaRules = [
  (v: string) => !!v || "Este campo es obligatorio",
  (v: string) => (v && v.length >= 2) || "Debe tener formato válido",
];

// Función para iniciar sesión
const loginUser = () => {
  usersStore.loginUser(userName.value, contrasenia.value);
};

</script>


<template>
  <v-sheet class="mx-auto" width="300">
    <v-form fast-fail @submit.prevent="loginUser">
      <v-text-field v-model="userName" :rules="userNameRules" label="First name"></v-text-field>
      <v-text-field v-model="contrasenia" :rules="contraseniaRules" label="Last name"></v-text-field>

      <v-btn class="mt-2" type="submit" block color="primary">Iniciar sesión</v-btn>

      <!-- Mensajes de error o éxito desde el store -->
      <v-alert v-if="usersStore.errorMessage" type="error" class="mt-2">{{ usersStore.errorMessage }}</v-alert>
      <v-alert v-if="usersStore.successMessage" type="success" class="mt-2">{{ usersStore.successMessage }}</v-alert>
    </v-form>
  </v-sheet>
</template>

<style lang="scss">
.mx-auto{
    margin-top: 15%;
    margin-bottom: 15%;
}
</style>