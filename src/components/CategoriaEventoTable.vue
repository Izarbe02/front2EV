<template>
    <div class="contenido">
        <h1 class="contenido__titulo">CATEGORÍAS DE EVENTOS</h1>
        <table class="contenido__tabla">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="categoria in categorias" :key="categoria.id">
                    <td>{{ categoria.id }}</td>
                    <td>{{ categoria.nombre }}</td>
                    <td>
                        <button class="btn-editar" @click="editarCategoria(categoria.id)">
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
import { onMounted } from 'vue';
import { useCategoriaEventosStore } from '@/stores/categoriaEventos';

const store = useCategoriaEventosStore();
const { categorias, findAll, deleteCategoria } = store;

// Cargar categorías al montar el componente
onMounted(() => {
    findAll();
});

// Función para editar (por ahora solo muestra el ID en consola)
const editarCategoria = (id: number) => {
    console.log("Editar categoría con ID:", id);
};

// Función para borrar una categoría
const borrarCategoria = async (id: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta categoría?")) {
        await deleteCategoria(id);
    }
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
    justify-content: center;
    background-color: #131313;
    border: solid 2px #5c5c5c;

    &__titulo {
        font-family: $titulo;
        font-size: 2.3rem;
        font-weight: bold;
        color: $color-red;
        margin-bottom: 4%;
    }

    &__tabla {
        color: white;
        font-size: 1.5rem;
    }

    th, td {
        padding: 12px 18px; // Más espacio dentro de cada celda
        text-align: left;
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
    }

    .btn-editar:hover {
        color: #c0c0c0;
    }

    .btn-borrar {
        color: #bb2231;
    }

    .btn-borrar:hover {
        color: #a71d2a;
    }
}
</style>
