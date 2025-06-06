<!-- src/components/Formulogin.vue -->
<template>
  <v-form class="form-login">
    <v-text-field
      v-model="username"
      :rules="usernameRules"
      label="Username o Email"
      class="form-login__input"
    ></v-text-field>

    <v-text-field
      v-model="contrasenia"
      :rules="contraseniaRules"
      label="Contraseña"
      type="password"
      class="form-login__input"
    ></v-text-field>

    <a href="#" class="form-login__forgot-password">¿OLVIDASTE LA CONTRASEÑA?</a>
    <RouterLink to="/register" class="form-login__register">¿NO ESTÁS REGISTRADO/A?</RouterLink>

    <v-btn class="form-login__button" block color="red" @click="loginUser">
      Ingresar
    </v-btn>

    <v-btn class="form-login__button_organizador" block @click="loginComoOrganizador">
      Ingresar como organizador
    </v-btn>

    <v-alert v-if="usuariosStore.errorMessage" type="error" class="form-login__error">
      Credenciales incorrectas
    </v-alert>
  </v-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUsuariosStore } from '@/stores/usuarios';
import { useOrganizadoresStore } from '@/stores/organizadores';
import type { UsuarioLoginDto } from '@/stores/dtos/usuarioLogin.dto';
import Swal from 'sweetalert2';
const usuariosStore = useUsuariosStore();
const router = useRouter();
const organizadoresStore = useOrganizadoresStore();

const username = ref("");
const contrasenia = ref("");

const usernameRules = [(v: string) => !!v || "Campo obligatorio"];
const contraseniaRules = [(v: string) => !!v || "Campo obligatorio"];

const loginUser = async () => {
  const dto: UsuarioLoginDto = {
    username: username.value,
    contrasenia: contrasenia.value,
  };

  const ok = await usuariosStore.login(dto);
  if (ok) {
    router.push("/");
  }
};

const loginComoOrganizador = async () => {
  const dto: UsuarioLoginDto = {
    username: username.value,
    contrasenia: contrasenia.value,
  };

  const ok = await organizadoresStore.loginOrganizador(dto);

  if (ok && organizadoresStore.organizadorLogeado?.idRol === 2) {
    localStorage.setItem("organizadorLogeado", JSON.stringify(organizadoresStore.organizadorLogeado));
    localStorage.setItem("tokenLoginOrganizador", organizadoresStore.tokenLoginOrganizador ?? "");
    router.push("/");
  } else {
    organizadoresStore.logoutOrganizador();
    await Swal.fire({
      icon: 'error',
      title: 'Acceso denegado',
      text: 'Este usuario no tiene permisos de organizador.',
      confirmButtonColor: '#d40202' // tu $color-red
    });
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";
@import "@/assets/styles/_mixins.scss";

.form-login {
  display: flex;
  flex-direction: column;
  gap: 16px;

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

  &__forgot-password,
  &__register {
    display: block;
    color: $color-lightred;
    font-size: 16px;
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

  &__button_organizador {
    background-color: $color-whitered;
    border: 1px solid $color-red;
    color: $color-lightred;
    font-weight: bold;
    text-transform: uppercase;
    margin-top: 16px;
    font-family: 'Poppins', sans-serif;
    transition: all 0.3s ease-in-out;

    &:hover {
      color: white;
    }

    &:active {
      box-shadow: 0 0 10px 3px rgba($color-red, 0.7);
    }
  }

  &__error {
    background: $color-lightred;
    color: $color-black;
    font-weight: bold;
    margin-top: 16px;
  }
}
</style>
