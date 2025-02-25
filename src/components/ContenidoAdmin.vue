<template>
    <div class="contenido">
        <h1 class="contenido__titulo">CONTENIDO</h1>
        <div class="contenido__info">
                <table class="contenido__tabla">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="usuario in usuarios" :key="usuario.id">
                            <td>{{ usuario.id }}</td>
                            <td>{{ usuario.nombre }}</td>
                            <td>{{ usuario.email }}</td>
                            <td>
                                <button class="btn-editar" @click="editarUsuario(usuario.id)">Editar</button>
                                <button class="btn-borrar" @click="borrarUsuario(usuario.id)">Borrar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
        </div>
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
    // Aquí podrías redirigir a una vista de edición o abrir un modal
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &__titulo{
            margin-top: 5%;
            font-family:$titulo;
            font-size: 2.3rem;
            font-weight: bold;
            margin-bottom: 10px;
            color: $color-red;
    }
    &__tabla{
        color: white;
        font-size: 1.5rem;
    }
}
</style>
