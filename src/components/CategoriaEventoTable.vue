<template>
  <div class="contenido">
    <h1 class="contenido__titulo">CATEGORÍAS DE EVENTOS</h1>

    <form @submit.prevent="guardarCategoria" class="contenido__crear">
      <input
        type="text"
        v-model="categoriaNombre"
        placeholder="Nombre de la categoría"
        class="contenido__input"
        required
      />
      <button type="submit" class="contenido__crear-boton">
        {{ modoEdicion ? 'Actualizar' : 'Crear' }} Categoría
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
        <tr v-if="categorias.length === 0">
          <td colspan="3">No hay categorías disponibles</td>
        </tr>
        <tr v-for="categoria in categorias" :key="categoria.id">
          <td>{{ categoria.id }}</td>
          <td>{{ categoria.nombre }}</td>
          <td>
            <button class="btn-editar" @click="editarCategoria(categoria.id, categoria.nombre)">
              <i class="fas fa-pencil-alt"></i>
            </button>
            <button class="btn-borrar" @click="borrarCategoria(categoria.id)">
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
import { useCategoriaEventosStore } from '@/stores/categoriaEventos';

const store = useCategoriaEventosStore();
const { categorias, findAll, createCategoria, updateCategoria, deleteCategoria } = store;

const categoriaNombre = ref('');
const modoEdicion = ref(false);
const idEditando = ref<number | null>(null);

onMounted(() => {
  findAll();
});

const guardarCategoria = async () => {
  if (modoEdicion.value && idEditando.value !== null) {
    await updateCategoria(idEditando.value, {
      id: idEditando.value,
      nombre: categoriaNombre.value.trim()
    });
  } else {
    await createCategoria({
      id: 0,
      nombre: categoriaNombre.value.trim()
    });
  }
  categoriaNombre.value = '';
  idEditando.value = null;
  modoEdicion.value = false;
  await findAll();
};

const editarCategoria = (id: number, nombre: string) => {
  categoriaNombre.value = nombre;
  idEditando.value = id;
  modoEdicion.value = true;
};

const borrarCategoria = async (id: number) => {
  if (confirm("¿Estás seguro de que quieres eliminar esta categoría?")) {
    await deleteCategoria(id);
    await findAll();
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";
@import "@/assets/styles/_mixins.scss";

.contenido {
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 10px;
  background-color: $color-darkgray;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__titulo {
    font-family: $titulo;
    font-size: 2.3rem;
    font-weight: bold;
    color: $color-red;
    text-align: center;
    margin-bottom: 1.5rem;
  }

  &__crear {
    width: 100%;
    max-width: 500px;
    margin-bottom: 2rem;
    display: flex;
    gap: 1rem;

    &-boton {
      background-color: $color-darkGreen;
      color: white;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 6px;
      font-weight: bold;
      font-family: $first-font;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;

      &:hover {
        background-color: $color-green;
        color: $color-black;
      }
    }
  }

  &__input {
    flex: 1;
    padding: 0.75rem;
    font-size: 1rem;
    border: 1px solid $color-lightgray;
    border-radius: 6px;
    background-color: #1e1e1e;
    color: white;
  }

  &__tabla {
    width: 100%;
    overflow-x: auto;
    color: white;
    font-size: 0.95rem;

    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 500px;
    }

    th,
    td {
      padding: 0.75rem 1rem;
      text-align: left;
      border-bottom: 1px solid $color-lightgray;
    }

    th {
      background-color: $color-lightgray;
      font-weight: bold;
      color: white;
    }
  }
}

.btn-editar, .btn-borrar {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  margin: 0 15px;
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
</style>
