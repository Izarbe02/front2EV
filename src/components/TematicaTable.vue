<template>
  <div class="contenido">
    <h1 class="contenido__titulo">TEMÁTICAS</h1>

    <form @submit.prevent="guardarTematica" class="contenido__formulario">
      <input
        type="text"
        v-model="nombre"
        class="contenido__input"
        placeholder="Nombre de la temática"
        required
      />
      <button type="submit" class="contenido__boton">
        {{ esEdicion ? 'Actualizar' : 'Crear' }} temática
      </button>
    </form>

    <table class="contenido__tabla">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tematica in tematicas" :key="tematica.id">
          <td>{{ tematica.id }}</td>
          <td>{{ tematica.nombre }}</td>
          <td>
            <button class="btn-editar" @click="editarTematica(tematica)">
              <i class="fas fa-pencil-alt"></i>
            </button>
            <button class="btn-borrar" @click="borrarTematica(tematica.id)">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTematicasStore } from '@/stores/tematicas';
import type TematicaDto from '@/stores/dtos/tematica.dto';

const store = useTematicasStore();
const { tematicas, findAll, deleteTematica, createTematica, updateTematica } = store;

const nombre = ref('');
const esEdicion = ref(false);
const idEditando = ref<number | null>(null);

onMounted(() => {
  findAll();
});

const guardarTematica = async () => {
  const tematica: TematicaDto = {
    id: idEditando.value ?? -1,
    nombre: nombre.value
  };

  if (esEdicion.value && idEditando.value !== null) {
    await updateTematica(idEditando.value, tematica);
  } else {
    await createTematica(tematica);
  }

  resetFormulario();
  await findAll();
};

const editarTematica = (tematica: TematicaDto) => {
  nombre.value = tematica.nombre;
  idEditando.value = tematica.id;
  esEdicion.value = true;
};

const borrarTematica = async (id: number) => {
  if (confirm('¿Estás seguro de que quieres eliminar esta temática?')) {
    await deleteTematica(id);
    await findAll();
  }
};

const resetFormulario = () => {
  nombre.value = '';
  idEditando.value = null;
  esEdicion.value = false;
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";
@import "@/assets/styles/_mixins.scss";

.contenido {
  margin-top: 5%;
  padding: 2%;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #131313;
  border: solid 2px #5c5c5c;

  &__titulo {
    font-family: $titulo;
    font-size: 2.3rem;
    font-weight: bold;
    color: $color-red;
    margin-bottom: 2rem;
  }

  &__formulario {
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 400px;
  }

  &__input {
    padding: 0.7rem;
    font-size: 1rem;
    border-radius: 6px;
    border: 1px solid $color-lightgray;
    color: #c0c0c0;
  }

  &__boton {
    background-color: $color-darkGreen;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    padding: 0.7rem;
    cursor: pointer;

    &:hover {
      background-color: $color-green;
    }
  }

  &__tabla {
    color: white;
    font-size: 1.5rem;
  }

  th,
  td {
    padding: 14px 22px;
    text-align: left;
    line-height: 1.8;
  }

  .btn-editar,
  .btn-borrar {
    background: none;
    border: none;
    cursor: pointer;
    margin: 0 10px;
  }

  .btn-editar {
    color: #797979;
    &:hover {
      color: #c0c0c0;
    }
  }

  .btn-borrar {
    color: #bb2231;
    &:hover {
      color: #a71d2a;
    }
  }
}
</style>
