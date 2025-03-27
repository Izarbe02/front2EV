<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { usePatrocinadorStore } from '@/stores/patrocinadores';
import type PatrocinadorDto from '@/stores/dtos/patrocinadores.dto';


const router = useRouter(); 
//de url se obtiene el id del patrocinador
const props = defineProps({
  patrocinadorId: {
    type: Number,
    default: null
  }
});

const patrocinadoresStore = usePatrocinadorStore();
const patrocinador = ref<PatrocinadorDto | null>(null);

// Variables reactivas
const nombre = ref("");
const descripcion = ref("");
const logo = ref("");
const contacto = ref("");
const idOrganizador = ref("");

// Cargar patrocinador
const loadPatrocinador = async (id: number | null) => {
  if (id !== null) {
    patrocinador.value = await patrocinadoresStore.getPatrocinador(id);
    if (patrocinador.value) {
      nombre.value = patrocinador.value.nombre;
      descripcion.value = patrocinador.value.descripcion;
      logo.value = patrocinador.value.logo;
      contacto.value = patrocinador.value.contacto;
      idOrganizador.value = patrocinador.value.idOrganizador.toString();
      console.log("Patrocinador cargado:", patrocinador.value);
    }
  }
};

// Actualizar patrocinador
const actualizarPatrocinador = async () => {
  if (props.patrocinadorId === null) return;

  const updatedPatrocinador: PatrocinadorDto = {
    id: props.patrocinadorId,
    nombre: nombre.value,
    descripcion: descripcion.value,
    logo: logo.value,
    contacto: contacto.value,
    idOrganizador: Number(idOrganizador.value)
  };

  await patrocinadoresStore.updatePatrocinador(props.patrocinadorId, updatedPatrocinador);
  router.push('/Patrocinadores');
};

onMounted(() => {
  loadPatrocinador(props.patrocinadorId);
});

watch(() => props.patrocinadorId, (newId) => {
  loadPatrocinador(newId);
});
</script>

<template>
  <v-container class="registro">
    <v-sheet class="registro__sheet" elevation="8">
      <h2 class="registro__title">Editar Patrocinador</h2>
      <p class="registro__subtitle">Modifica los datos del patrocinador.</p>

      <v-form @submit.prevent="actualizarPatrocinador" class="registro__form">
        <v-text-field v-model="nombre" label="Nombre " class="registro__input" />
        <v-text-field v-model="descripcion" label="Descripcion"  class="registro__input" />
        <v-text-field v-model="logo" label="logo" class="registro__input" />
        <v-text-field v-model="contacto" label="contacto"  class="registro__input" />
        <v-text-field v-model="idOrganizador" label="ID del Organizador" type="number" class="registro__input" />

        <v-btn type="submit" block class="registro__button">Guardar cambios</v-btn>
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
