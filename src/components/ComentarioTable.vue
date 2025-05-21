<template>
  <div class="contenido">
    <h1 class="contenido__titulo">COMENTARIOS</h1>

    <button class="contenido__boton" @click="abrirFormulario()">➕ Añadir Comentario</button>

    <table class="contenido__tabla">
      <thead>
        <tr>
          <th>ID</th>
          <th>IdUsuario</th>
          <th>IdEvento</th>
          <th>Contenido</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="comentario in comentarios" :key="comentario.id">
          <td>{{ comentario.id }}</td>
          <td>{{ comentario.idUsuario }}</td>
          <td>{{ comentario.idEvento }}</td>
          <td>{{ comentario.contenido }}</td>
          <td>
            <button class="btn-editar" @click="editarComentario(comentario)">
              <i class="fas fa-pencil-alt"></i>
            </button>
            <button class="btn-borrar" @click="borrarComentario(comentario.id)">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="mostrarFormulario" class="formulario">
      <h2 class="formulario__titulo">
        {{ esEdicion ? 'Editar Comentario' : 'Nuevo Comentario' }}
      </h2>

      <form @submit.prevent="guardarComentario" class="formulario__form">
        <label>Contenido:</label>
        <textarea v-model="form.contenido" required />

        <label>ID Usuario:</label>
        <input type="number" v-model="form.idUsuario" required />

        <label>ID Evento:</label>
        <input type="number" v-model="form.idEvento" required />

        <div class="formulario__acciones">
          <button type="submit">Guardar</button>
          <button type="button" @click="cerrarFormulario">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useComentariosStore } from '@/stores/comentarios';
import type ComentarioDto from '@/stores/dtos/comentario.dto';

const store = useComentariosStore();
const { comentarios, findAll, deleteComentario, createComentario, updateComentario } = store;

onMounted(() => {
  findAll();
});

const mostrarFormulario = ref(false);
const esEdicion = ref(false);
const form = ref<ComentarioDto>({
  id: -1,
  contenido: '',
  idUsuario: 0,
  idEvento: 0,
  fecha: new Date().toISOString(),
  nombreUsuario: ''
});

function abrirFormulario(comentario?: ComentarioDto) {
  if (comentario) {
    form.value = { ...comentario };
    esEdicion.value = true;
  } else {
    form.value = {
      id: -1,
      contenido: '',
      idUsuario: 0,
      idEvento: 0,
      fecha: new Date().toISOString(),
      nombreUsuario: ''
    };
    esEdicion.value = false;
  }
  mostrarFormulario.value = true;
}

function cerrarFormulario() {
  mostrarFormulario.value = false;
}

async function guardarComentario() {
  if (esEdicion.value) {
    console.log("Enviando PUT con:", form.value);
    await updateComentario(form.value);
  } else {
    const nuevoComentario = {
      idUsuario: form.value.idUsuario,
      idEvento: form.value.idEvento,
      contenido: form.value.contenido,
      fecha: new Date().toISOString()
    };
    console.log("Enviando POST con:", nuevoComentario);
    await createComentario(nuevoComentario);
  }

  cerrarFormulario();
  await findAll();
}

function editarComentario(comentario: ComentarioDto) {
  abrirFormulario(comentario);
}

async function borrarComentario(id: number) {
  if (confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
    await deleteComentario(id);
    await findAll();
  }
}
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

  &__tabla {
    color: white;
    font-size: 1.5rem;
    width: 100%;
    max-width: 1000px;
    margin-bottom: 2rem;

    th, td {
      padding: 12px 18px;
      text-align: left;
      word-wrap: break-word;
    }

    th {
      background-color: $color-darkgray;
    }
  }

  &__boton {
    background-color: $color-darkGreen;
    color: white;
    padding: 0.5rem 1rem;
    font-weight: bold;
    border-radius: 6px;
    margin-bottom: 1rem;

    &:hover {
      background-color: $color-green;
    }
  }
}

.btn-editar,
.btn-borrar {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
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

.formulario {
  background-color: $color-darkgray;
  color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;

  &__titulo {
    font-size: 1.8rem;
    color: $color-lightred;
    margin-bottom: 1rem;
  }

  &__form label {
    display: block;
    margin-top: 1rem;
    font-weight: bold;
  }

  &__form input,
  &__form textarea {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.5rem;
    border-radius: 6px;
    border: none;
  }

  &__acciones {
    margin-top: 1.5rem;
    display: flex;
    gap: 1rem;

    button {
      padding: 0.6rem 1.2rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
    }

    button:first-child {
      background-color: $color-darkGreen;
      color: white;

      &:hover {
        background-color: $color-green;
      }
    }

    button:last-child {
      background-color: $color-lightgray;
      color: white;

      &:hover {
        background-color: $color-gray;
      }
    }
  }
}
</style>
