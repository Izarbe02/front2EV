<template>
    <div class="contenido">
        <h1 class="contenido__titulo">USUARIOS</h1>
        <table class="contenido__tabla">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Contraseña</th>
                    <th>Ubicación</th>
                    <th>IdRol</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="usuario in usuarios" :key="usuario.id">
                    <td>{{ usuario.id }}</td>
                    <td>{{ usuario.nombre }}</td>
                    <td>{{ usuario.username }}</td>
                    <td>{{ usuario.email }}</td>
                    <td>{{ usuario.contrasenia }}</td>
                    <td>{{ usuario.ubicacion }}</td>
                    <td>{{ usuario.idRol }}</td>
                    <td>
                        <button class="btn-editar" @click="abrirForm(usuario)">
                            <i class="fas fa-pencil-alt"></i>
                        </button>
                        <button class="btn-borrar" @click="borrarUsuario(usuario.id)">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <button class="btn-crear" @click="abrirFormularioNuevo">Crear Usuario</button>
        
        <div v-if="modalVisible" class="modal">
            <div class="modal-contenido">
                <h2>{{ esModoEdicion ? 'Editar Usuario' : 'Crear Usuario' }}</h2>

                <label>Nombre:</label>
                <input type="text" v-model="usuarioEditado.nombre" />
                <label>Username:</label>
                <input type="text" v-model="usuarioEditado.username" />

                <label>Email:</label>
                <input type="email" v-model="usuarioEditado.email" />

                <label>Contraseña:</label>
                <input type="text" v-model="usuarioEditado.contrasenia" />

                <label>Ubicación:</label>
                <input type="text" v-model="usuarioEditado.ubicacion" />

                <label>IdRol:</label>
                <input type="number" v-model="idRolEditado" />

                <div class="modal-botones">
                    <button @click="guardarCambios" :disabled="!usuarioEditado">Guardar</button>
                    <button @click="cerrarFormulario">Cancelar</button>
                </div>
            </div>
        </div>
    </div>    
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useUsuariosStore } from '@/stores/usuarios';
import type UsuarioDto from '@/stores/dtos/usuario.dto';

const modalVisible = ref(false);
const usuarioEditado = ref<UsuarioDto | null>(null);
const esModoEdicion = ref(false)

const store = useUsuariosStore();
const { usuarios, findAll, deleteUsuario, updateUsuario, createUsuario } = store;

onMounted(() => {
    findAll();
});


const idRolEditado = computed({
    get: () => usuarioEditado.value?.idRol ?? 0,
    set: (value) => {
        if (usuarioEditado.value) usuarioEditado.value.idRol = Number(value);
    }
});

const abrirForm = (usuario: UsuarioDto) => {
    usuarioEditado.value = { ...usuario };
    esModoEdicion.value = true
    modalVisible.value = true;
};

const abrirFormularioNuevo = () => {
    usuarioEditado.value = { id: 0, nombre: '', email: '', ubicacion: '', idRol: 1 };
    esModoEdicion.value = false;
    modalVisible.value = true;
};

const guardarCambios = async () => {
    if (!usuarioEditado.value) return;

    usuarioEditado.value.idRol = Number(usuarioEditado.value.idRol);
    if (isNaN(usuarioEditado.value.idRol) || usuarioEditado.value.idRol <= 0) {
        alert("El rol seleccionado no es válido.");
        return;
    }

    if (esModoEdicion.value) {
        await updateUsuario(usuarioEditado.value.id, usuarioEditado.value);
    } else {
        await createUsuario(usuarioEditado.value);
    }
    modalVisible.value = false;
};

const cerrarFormulario = () => {
    modalVisible.value = false;
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
        font-family: $first-font;
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
.btn-crear {
    color: $color-lightred;
    padding: 10px;
    border: 2px solid #797979;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.2rem;
    margin-bottom: 10px;
}

.btn-crear:hover {
    background-color: #000000;
}
</style>
