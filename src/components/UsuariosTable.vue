<template>
    <div class="contenido">
        <h1 class="contenido__titulo">USUARIOS</h1>
        <table class="contenido__tabla">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Ubicación</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="usuario in usuarios" :key="usuario.id">
                    <td>{{ usuario.id }}</td>
                    <td>{{ usuario.nombre }}</td>
                    <td>{{ usuario.email }}</td>
                    <td>{{ usuario.ubicacion }}</td>
                    <td>
                        <button class="btn-editar" @click="editarUsuario(usuario.id)"><i class="fas fa-pencil-alt"></i></button>
                        <button class="btn-borrar" @click="borrarUsuario(usuario.id)"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>    
</template>

<script setup lang="ts">

import { onMounted } from 'vue';
import { useUsuariosStore } from '@/stores/usuarios';

const store = useUsuariosStore();
const { usuarios, findAll, deleteUsuario } = store;

onMounted(() => {
    findAll();
});

const editarUsuario = (id: number) => {
    console.log("Editar usuario con ID:", id);
};

const borrarUsuario = async (id: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
        await deleteUsuario(id);
    }
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";
@import "@/assets/styles/_mixins.scss";
.contenido{
    margin-top: 5%;
    padding: 2%;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #131313;
    border: solid 2px#5c5c5c;
    &__titulo{
            font-family:$titulo;
            font-size: 2.3rem;
            font-weight: bold;
            color: $color-red;
            margin-bottom: 4%;
    }
    &__tabla{
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