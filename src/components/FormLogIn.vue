<template> 
  <v-container class="login">
    <v-sheet class="login__sheet" elevation="8">
      <h2 class="login__title">Ingresar</h2>
      <p class="login__subtitle">Entrando podrás publicar nuevos eventos.</p>
      <v-form fast-fail @submit.prevent="loginUser" class="login__form">
        <v-text-field
          v-model="username"
          :rules="usernameRules"
          label="Email"
          class="login__input"
        ></v-text-field>

        <v-text-field
          v-model="contrasenia"
          :rules="contraseniaRules"
          label="Contraseña"
          type="password"
          class="login__input"
        ></v-text-field>

        <a href="#" class="login__forgot-password">¿OLVIDASTE LA CONTRASEÑA?</a>
        <RouterLink to="/register" class="login__register">¿NO ESTÁS REGISTRADO/A?</RouterLink>
        
        <v-btn class="login__button" type="submit" block color="red">
          Ingresar
        </v-btn>

        <v-alert v-if="usuariosStore.errorMessage" type="error" class="login__error">
          {{ usuariosStore.errorMessage }}
        </v-alert>
      </v-form>
    </v-sheet>
  </v-container>
</template>

<script lang="ts" setup>
import { useUsuariosStore } from '@/stores/usuarios';
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import type { UsuarioLoginDto } from '@/stores/dtos/usuarioLogin.dto';

const usuariosStore = useUsuariosStore();
const router = useRouter();

const username = ref("");
const contrasenia = ref("");

const usernameRules = [
  (value: string) => value.length > 0 || "Rellena este campo"
];

const contraseniaRules = [
  (value: string) => value.length > 0 || "Rellena este campo"
];

const loginUser = async () => {
  const usuarioLogin: UsuarioLoginDto = {
    username: username.value,
    contrasenia: contrasenia.value,
  };

  const loginExitoso = await usuariosStore.login(usuarioLogin);

  if (loginExitoso) {
    router.push("/");
  }
};

// Redirección automática si ya está logueado
watchEffect(() => {
  if (usuariosStore.usuarioLogeado) {
    router.push("/");
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
@import "@/assets/styles/_mixins.scss";

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding-bottom: 100px;
  background-color: rgb(14, 14, 14);
  background: url('@/assets/images/fondo1.jpg') no-repeat center center;
  background-size: cover;
  width: 100vw;
  height: 100vh;

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
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  &__subtitle {
    color: $color-lightred;
    font-size: 14px;
    margin-bottom: 16px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__input {
    background: transparent;
    border-bottom: 2px solid $color-red;
    color: white;
    border-radius: 0;
    font-size: 16px;

    &::placeholder {
      color: $color-lightred;
    }
  }

  &__forgot-password,
  &__register {
    display: block;
    color: $color-lightred;
    font-size: 14px;
    font-weight: bold;
    text-decoration: none;
    margin-top: 8px;
  }

  &__register {
    color: $color-whitered;
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
