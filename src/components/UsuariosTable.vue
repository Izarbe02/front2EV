<template>
  <div class="contenido">
    <h1 class="contenido__titulo">USUARIOS</h1>

    <button class="btn-crear" @click="abrirFormularioNuevo">Crear Usuario</button>

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
        <input type="text" v-model="ubicacionEditada" />

        <label>IdRol:</label>
        <input type="number" v-model="idRolEditado" />

        <div class="modal-botones">
          <button @click="guardarCambios">Guardar</button>
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
const esModoEdicion = ref(false);
const store = useUsuariosStore();
const { usuarios, findAll, deleteUsuario, updateUsuario, createUsuario } = store;

onMounted(() => {
  findAll();
});

const nuevoUsuario = (): UsuarioDto => ({
  id: 0,
  nombre: '',
  username: '',
  email: '',
  contrasenia: '',
  ubicacion: '',
  idRol: 1
});

const usuarioEditado = ref<UsuarioDto>(nuevoUsuario());

const idRolEditado = computed({
  get: () => usuarioEditado.value.idRol ?? 1,
  set: (value) => {
    usuarioEditado.value.idRol = Number(value) || 1;
  }
});

const ubicacionEditada = computed({
  get: () => usuarioEditado.value?.ubicacion ?? '',
  set: (value) => {
    if (usuarioEditado.value) usuarioEditado.value.ubicacion = value;
  }
});

const abrirForm = (usuario: UsuarioDto) => {
  usuarioEditado.value = { ...usuario };
  esModoEdicion.value = true;
  modalVisible.value = true;
};

const abrirFormularioNuevo = () => {
  usuarioEditado.value = nuevoUsuario();
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
  findAll();
};

const cerrarFormulario = () => {
  modalVisible.value = false;
};

const borrarUsuario = async (id: number) => {
  if (confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
    await deleteUsuario(id);
    findAll();
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";

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

  &__tabla {
    width: 100%;
    overflow-x: auto;
    color: white;
    font-size: 0.95rem;

    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 600px;
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

.btn-crear {
  background-color: $color-darkGreen;
  color: white;
  font-weight: bold;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  border: none;
  margin-bottom: 1rem;
  cursor: pointer;

  &:hover {
    background-color: $color-green;
    color: $color-black;
  }
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

  &-contenido {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &-botones {
    display: flex;
    gap: 10px;
    margin-top: 10px;

    button {
      padding: 8px 12px;
      cursor: pointer;
      border: none;
      border-radius: 4px;
      font-weight: bold;
    }

    button:first-child {
      background: $color-darkGreen;
      color: white;

      &:hover {
        background-color: $color-green;
        color: $color-black;
      }
    }

    button:last-child {
      background: $color-lightgray;
      color: white;

      &:hover {
        background-color: $color-gray;
      }
    }
  }
}
</style>
