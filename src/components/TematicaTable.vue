<template>
    <div class="contenido">
        <h1 class="contenido__titulo">TEMÁTICAS</h1>
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
                        <button class="btn-editar" @click="editarTematica(tematica.id)">
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
import { onMounted } from 'vue';
import { useTematicasStore } from '@/stores/tematicas';

const store = useTematicasStore();
const { tematicas, findAll, deleteTematica } = store;

// Cargar temáticas al montar el componente
onMounted(() => {
    findAll();
});

// Función para editar (por ahora solo muestra el ID en consola)
const editarTematica = (id: number) => {
    console.log("Editar temática con ID:", id);
};

// Función para borrar una temática
const borrarTematica = async (id: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta temática?")) {
        await deleteTematica(id);
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
        padding: 14px 22px; // Más espacio dentro de cada celda
        text-align: left;
        line-height: 1.8;
    }

    .btn-editar, .btn-borrar {
        background: none;
        border: none;
        cursor: pointer;
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
