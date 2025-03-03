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
                        <button class="btn-editar" @click="abrirForm(usuario)"><i class="fas fa-pencil-alt"></i></button>
                        <button class="btn-borrar" @click="borrarUsuario(usuario.id)"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="modalVisible" class="modal">
            <div class="modal-contenido">
                <h2>Editar Usuario</h2>
                <label>Nombre:</label>
                <input type="text" v-model="usuarioEditado.nombre" />
                
                <label>Email:</label>
                <input type="email" v-model="usuarioEditado.email" />
                
                <label>Ubicación:</label>
                <input type="text" v-model="usuarioEditado.ubicacion" />

                <div class="modal-botones">
                    <button @click="guardarCambios">Guardar</button>
                    <button @click="cerrarFormulario">Cancelar</button>
                </div>
            </div>
        </div>
    </div>    
</template>

<script setup lang="ts">

import { onMounted,ref } from 'vue';
import { useUsuariosStore } from '@/stores/usuarios';
import type UsuarioDto from '@/stores/dtos/usuario.dto';

const modalVisible = ref(false);
const usuarioEditado = ref<UsuarioDto | null>(null);


const store = useUsuariosStore();
const { usuarios, findAll, deleteUsuario, updateUsuario } = store;

onMounted(() => {
    findAll();
});


const abrirForm = (usuario: UsuarioDto) => {
    usuarioEditado.value = { ...usuario };
    modalVisible.value = true;
}

const guardarCambios = async () => {
    if(usuarioEditado.value) {
        await updateUsuario(usuarioEditado.value.id, usuarioEditado.value);
        modalVisible.value = false;
    }
}

const cerrarFormulario = () => {
    modalVisible.value = false;
}


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
    padding: 12px 18px;
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


.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-contenido {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.modal-botones {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}

.modal-botones button {
    padding: 8px 12px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
}

.modal-botones button:first-child {
    background: #007bff;
    color: white;
}

.modal-botones button:last-child {
    background: #dc3545;
    color: white;
}
}
</style>