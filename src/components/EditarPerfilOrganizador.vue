<template>
  <div class="perfil">
    <div class="perfil__header">
      <h2 class="perfil__titulo">Editar mi perfil</h2>
      <p class="perfil__subtitulo">Actualiza tu información personal</p>
      <div class="perfil__imagen">
        <img :src="imagenPerfil" alt="Foto de perfil" />
        </div>
    </div>

    <form class="perfil__formulario" @submit.prevent="actualizarPerfil">
      <div class="perfil__grid">

        <div class="perfil__campo">
          <label for="nombre" class="perfil__label">Nombre</label>
          <input v-model="form.nombre" id="nombre" class="perfil__input" type="text" required />
        </div>

        <div class="perfil__campo ">
          <label for="email" class="perfil__label">Email</label>
          <input v-model="form.email" id="email" class="perfil__input" type="email" required />
        </div>

        <div class="perfil__campo">
          <label for="ubicacion" class="perfil__label">Ubicación</label>
          <input v-model="form.ubicacion" id="ubicacion" class="perfil__input" type="text" />
        </div>

        <div class="perfil__campo">
          <label for="telefono" class="perfil__label">Teléfono</label>
          <input v-model="form.telefono" id="telefono" class="perfil__input" type="text" />
        </div>

        <div class="perfil__campo perfil__campo--full">
          <label for="descripcion" class="perfil__label">Descripción</label>
          <textarea v-model="form.descripcion" id="descripcion" class="perfil__input" rows="3"></textarea>
        </div>

        <div class="perfil__campo">
          <label for="password" class="perfil__label">Nueva contraseña</label>
          <div class="perfil__input-container">
            <input
              v-model="form.password"
              :type="mostrarPassword ? 'text' : 'password'"
              id="password"
              class="perfil__input"
            />
            <button type="button" class="perfil__toggle-password" @click="togglePasswordVisibility">
              {{ mostrarPassword ? 'Ocultar' : 'Mostrar' }}
            </button>
          </div>
          <span class="perfil__hint">Opcional - Mínimo 8 caracteres</span>
        </div>

        <div class="perfil__campo">
          <label for="file" class="perfil__label">Imagen de perfil</label>
          <input type="file" @change="handleFileChange" accept="image/*" class="perfil__input" id="file" />
        </div>
      </div>

      <div class="perfil__acciones">
        <button type="submit" class="perfil__boton perfil__boton--primario">
          <span class="perfil__boton-texto">Guardar cambios</span>
          <span v-if="cargando" class="perfil__spinner"></span>
        </button>
      </div>
    </form>

    <transition name="fade">
      <div v-if="mensaje" :class="['perfil__mensaje', { 'perfil__mensaje--error': hayError }]">
        {{ mensaje }}
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { useOrganizadoresStore } from '@/stores/organizadores';

const store = useOrganizadoresStore();
const organizador = computed(() => store.organizadorLogeado);

const cargando = ref(false);
const mensaje = ref('');
const hayError = ref(false);
const mostrarPassword = ref(false);
const file = ref<File | null>(null);
const previewUrl = ref<string | null>(null);

const form = reactive({
  username: 'string',
  nombre: '',
  email: '',
  ubicacion: '',
  telefono: '',
  descripcion: '',
  password: ''
});

onMounted(() => {
  if (organizador.value) {
    form.nombre = organizador.value.nombre;
    form.email = organizador.value.email;
    form.ubicacion = organizador.value.ubicacion;
    form.telefono = organizador.value.telefono;
    form.descripcion = organizador.value.descripcion;
  }
});

const imagenPerfil = computed(() => {
  if (previewUrl.value) return previewUrl.value;
  if (organizador.value?.enlace)
    return `${organizador.value.enlace}?t=${Date.now()}`; // 🔄 fuerza recarga
  return '';
});

function togglePasswordVisibility() {
  mostrarPassword.value = !mostrarPassword.value;
}

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target?.files?.[0]) {
    if (previewUrl.value) {
      URL.revokeObjectURL(previewUrl.value);
    }
    file.value = target.files[0];
    previewUrl.value = URL.createObjectURL(file.value);
  }
}

async function actualizarPerfil() {
  if (!organizador.value) return;

  cargando.value = true;
  mensaje.value = '';
  hayError.value = false;

  try {
    const formData = new FormData();
    formData.append('username', form.username);
    formData.append('nombre', form.nombre);
    formData.append('email', form.email);
    formData.append('ubicacion', form.ubicacion);
    formData.append('telefono', form.telefono);
    formData.append('descripcion', form.descripcion);
    formData.append(
      'contrasenia',
      form.password.trim() !== ''
        ? form.password
        : organizador.value.contrasenia
    );
    if (file.value) {
      formData.append('file', file.value);
    }

    const actualizado = await store.updateOrganizadorConImagen(
      organizador.value.id,
      formData
    );

    if (actualizado) {
      store.organizadorLogeado = actualizado;
      localStorage.setItem('organizadorLogeado', JSON.stringify(actualizado));
    }

    mensaje.value = 'Perfil actualizado correctamente.';
    form.password = '';
    previewUrl.value = null;
  } catch (error: any) {
    mensaje.value = 'Error al actualizar perfil.';
    hayError.value = true;
    console.error(error);
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

   &__imagen {
    margin-top: 1rem;
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;

    img {
        width: 120px;
        height: 120px;
        object-fit: cover;
        border-radius: 50%;
        border: 3px solid $color-green;
        box-shadow: 0 0 10px rgba($color-green, 0.3);
        }
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
    background-color: rgb(34, 34, 34);
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
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
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
