<template>
  <div class="perfil">
    <div class="perfil__header">
      <h2 class="perfil__titulo">Editar mi perfil</h2>
      <p class="perfil__subtitulo">Actualiza tu información personal</p>
    </div>

    <form class="perfil__formulario" @submit.prevent="actualizarPerfil">
      <div class="perfil__grid">
        <div class="perfil__campo">
          <label for="username" class="perfil__label">Username</label>
          <div class="perfil__input-container">
            <input
              v-model="form.username"
              id="username"
              class="perfil__input"
              type="text"
              placeholder="Tu nombre de usuario"
              required
            />
            <span class="perfil__input-icon">@</span>
          </div>
        </div>

        <div class="perfil__campo">
          <label for="nombre" class="perfil__label">Nombre</label>
          <div class="perfil__input-container">
            <input
              v-model="form.nombre"
              id="nombre"
              class="perfil__input"
              type="text"
              placeholder="Tu nombre completo"
              required
            />
          </div>
        </div>

        <div class="perfil__campo perfil__campo--full">
          <label for="email" class="perfil__label">Email</label>
          <div class="perfil__input-container">
            <input
              v-model="form.email"
              id="email"
              class="perfil__input"
              type="email"
              placeholder="ejemplo@correo.com"
              required
            />
          </div>
        </div>

        <div class="perfil__campo">
          <label for="ubicacion" class="perfil__label">Ubicación</label>
          <div class="perfil__input-container">
            <input
              v-model="form.ubicacion"
              id="ubicacion"
              class="perfil__input"
              type="text"
              placeholder="Ciudad, País"
            />
          </div>
        </div>

        <div class="perfil__campo">
          <label for="password" class="perfil__label">Nueva contraseña</label>
          <div class="perfil__input-container">
            <input
              v-model="form.password"
              id="password"
              class="perfil__input"
              type="password"
              placeholder=""
            />
            <button
              type="button"
              class="perfil__toggle-password"
              @click="togglePasswordVisibility"
            >
              {{ mostrarPassword ? 'Ocultar' : 'Mostrar' }}
            </button>
          </div>
          <span class="perfil__hint">Opcional - Mínimo 8 caracteres</span>
        </div>
      </div>

      <div class="perfil__acciones">
        <button type="button" class="perfil__boton perfil__boton--secundario">Cancelar</button>
        <button type="submit" class="perfil__boton perfil__boton--primario">
          <span class="perfil__boton-texto">Guardar cambios</span>
          <span v-if="cargando" class="perfil__spinner"></span>
        </button>
      </div>
    </form>

    <transition name="fade">
      <div v-if="mensaje" :class="['perfil__mensaje', {'perfil__mensaje--error': hayError}]">
        {{ mensaje }}
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useUsuariosStore } from '@/stores/usuarios';

const store = useUsuariosStore();
const usuario = store.usuarioLogeado;
console.log(usuario);

const mensaje = ref('');
const hayError = ref(false);
const cargando = ref(false);
const mostrarPassword = ref(false);

const form = reactive({
  username: usuario?.username || '',
  nombre: usuario?.nombre || '',
  email: usuario?.email || '',
  ubicacion: usuario?.ubicacion || '',
  password: ''
});

function togglePasswordVisibility() {
  mostrarPassword.value = !mostrarPassword.value;

  const passwordInput = document.getElementById('password') as HTMLInputElement;
  if (passwordInput) {
    passwordInput.type = mostrarPassword.value ? 'text' : 'password';
  }
}

async function actualizarPerfil() {
  if (!usuario) return;

  cargando.value = true;
  hayError.value = false;
  mensaje.value = '';

  // Generar nueva clase usuario completa
  const usuarioActualizado = {
    ...usuario,
    username: form.username,
    nombre: form.nombre,
    email: form.email,
    ubicacion: form.ubicacion,
    password: form.password.trim() !== '' ? form.password : usuario.contrasenia
  };

  try {
    await store.updateUsuario(usuario.id, usuarioActualizado);

    mensaje.value = 'Perfil actualizado correctamente.';
    form.password = '';

store.usuarioLogeado = { ...usuarioActualizado, contrasenia: usuario.contrasenia };
  } catch (error) {
    console.error(error);
    mensaje.value = 'Hubo un error al actualizar el perfil.';
    hayError.value = true;
  } finally {
    cargando.value = false;
  }
}
</script>


<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";

.perfil {

  padding: 2rem;
  font-family: $first-font;
  max-width: 800px;
  margin: 0 auto;

  &__header {
    margin-bottom: 2rem;
    text-align: center;
  }

  &__titulo {
    font-size: 1.8rem;
    color: white;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  &__subtitulo {
    font-size: 1rem;
    color: $color-lightgray;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @media (min-width: 576px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__campo {
    display: flex;
    flex-direction: column;

    &--full {
      @media (min-width: 576px) {
        grid-column: span 2;
      }
    }
  }

  &__label {
    color: white;
    font-weight: 600;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    letter-spacing: 0.5px;
  }

  &__input-container {
    position: relative;
    width: 100%;
  }

  &__input {
    width: 100%;
    padding: 12px 14px;
    border: 2px solid rgba($color-lightgray, 0.2);
    border-radius: 6px;
    font-size: 1rem;
    background-color:white;
    color: white;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: $color-red;
      background-color: rgba(white, 0.1);
      box-shadow: 0 0 0 3px rgba($color-red, 0.2);
    }

    &::placeholder {
      color: rgba($color-lightgray, 0.5);
    }
  }

  &__input-icon {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: $color-lightgray;
  }

  &__hint {
    font-size: 0.8rem;
    color: $color-lightgray;
    margin-top: 0.4rem;
  }

  &__toggle-password {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: $color-lightgray;
    font-size: 0.8rem;
    cursor: pointer;
    padding: 2px 6px;

    &:hover {
      color: white;
    }
  }

  &__acciones {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;

    @media (max-width: 576px) {
      flex-direction: column;
    }
  }

  &__boton {
    padding: 12px 20px;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-width: 150px;

    @media (max-width: 576px) {
      width: 100%;
    }

    &--primario {
      background-color: $color-red;
      color: white;

      &:hover {
        background-color: $color-lightred;
        transform: translateY(-2px);
      }

      &:active {
        transform: translateY(0);
      }
    }

    &--secundario {
      background-color: transparent;
      border: 1px solid $color-lightgray;
      color: $color-lightgray;

      &:hover {
        background-color: rgba(white, 0.05);
        color: white;
      }
    }
  }

  &__boton-texto {
    pointer-events: none;
  }

  &__spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(white, 0.3);
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  &__mensaje {
    margin-top: 1.5rem;
    padding: 12px 16px;
    border-radius: 6px;
    font-weight: 500;
    background-color: rgba($color-green, 0.2);
    color: $color-green;
    text-align: center;

    &--error {
      background-color: rgba($color-red, 0.2);
      color: $color-red;
    }
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
@media (min-width: 992px) {
  .perfil {
    max-width: 1000px;
    padding: 3rem;

    &__titulo {
      font-size: 2.4rem;
    }

    &__subtitulo {
      font-size: 1.2rem;
    }

    &__label {
      font-size: 1rem;
    }

    &__input {
      font-size: 1.1rem;
      padding: 16px 18px;
    }

    &__toggle-password {
      font-size: 0.9rem;
    }

    &__hint {
      font-size: 0.9rem;
    }

    &__boton {
      font-size: 1.1rem;
      padding: 14px 24px;
      min-width: 180px;
    }

    &__mensaje {
      font-size: 1.1rem;
    }
  }
}

</style>
