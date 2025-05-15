<script setup lang="ts">
import { ref } from 'vue'
import { useEventosStore } from '@/stores/eventos'

const eventosStore = useEventosStore()

// Datos del formulario
const nombre = ref('')
const descripcion = ref('')
const ubicacion = ref('')
const fechaInicio = ref('')
const fechaFin = ref('')
const idOrganizador = ref(1) // puedes cargarlo dinámicamente si lo necesitas
const file = ref<File | null>(null)

const mensaje = ref('')
const error = ref('')

// Manejar selección de imagen
function seleccionarArchivo(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    file.value = target.files[0]
  }
}

// Enviar evento usando el store
async function crearEvento() {
  mensaje.value = ''
  error.value = ''

  if (!file.value) {
    error.value = 'Debe seleccionar una imagen para el evento.'
    return
  }

  const formData = new FormData()
  formData.append('nombre', nombre.value)
  formData.append('descripcion', descripcion.value)
  formData.append('ubicacion', ubicacion.value)
  formData.append('fechaInicio', new Date(fechaInicio.value).toISOString())
  formData.append('fechaFin', new Date(fechaFin.value).toISOString())
  formData.append('idOrganizador', idOrganizador.value.toString())
  formData.append('file', file.value)

  try {
    const eventoCreado = await eventosStore.crearEvento(formData)
    mensaje.value = 'Evento creado correctamente.'
    console.log('Evento creado:', eventoCreado)
    // Puedes redirigir o limpiar el formulario si quieres
  } catch (err: any) {
    console.error(err)
    error.value = 'Error al crear el evento: ' + err.message
  }
}
</script>

<template>
  <div class="crear-evento">
    <h2 class="crear-evento__titulo">Crear nuevo evento</h2>

    <form @submit.prevent="crearEvento" class="crear-evento__formulario">
      <label class="crear-evento__label">Nombre:</label>
      <input v-model="nombre" type="text" required class="crear-evento__input" />

      <label class="crear-evento__label">Descripción:</label>
      <textarea v-model="descripcion" required class="crear-evento__textarea"></textarea>

      <label class="crear-evento__label">Ubicación:</label>
      <input v-model="ubicacion" type="text" required class="crear-evento__input" />

      <label class="crear-evento__label">Fecha de inicio:</label>
      <input v-model="fechaInicio" type="datetime-local" required class="crear-evento__input" />

      <label class="crear-evento__label">Fecha de fin:</label>
      <input v-model="fechaFin" type="datetime-local" required class="crear-evento__input" />

      <label class="crear-evento__label">Imagen:</label>
      <input type="file" @change="seleccionarArchivo" accept="image/*" required class="crear-evento__input" />

      <button type="submit" class="crear-evento__boton">Crear evento</button>

      <p v-if="mensaje" class="crear-evento__mensaje">{{ mensaje }}</p>
      <p v-if="error" class="crear-evento__error">{{ error }}</p>
    </form>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";

.crear-evento {
  max-width: 600px;
  margin: 3rem auto;
  padding: 2rem;
  background-color: $color-darkgray;
  border-radius: 10px;
  color: white;
  font-family: $first-font;

  &__titulo {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    text-align: center;
    color: $color-red;
  }

  &__formulario {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__label {
    font-weight: bold;
    color: $color-palidGreen;
  }

  &__input,
  &__textarea {
    padding: 0.6rem;
    border: none;
    border-radius: 5px;
    background-color: $color-lightgray;
    color: white;
    font-family: $first-font;
  }

  &__textarea {
    resize: vertical;
    min-height: 100px;
  }

  &__boton {
    background-color: $color-lightred;
    color: black;
    font-weight: bold;
    padding: 0.7rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: $color-red;
      color: white;
    }
  }

  &__mensaje {
    color: $color-green;
    font-weight: bold;
    margin-top: 1rem;
    text-align: center;
  }

  &__error {
    color: $color-red;
    font-weight: bold;
    margin-top: 1rem;
    text-align: center;
  }
}
</style>
