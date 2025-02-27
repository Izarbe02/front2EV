<template>
    <div class="contenido">
        <h1 class="contenido__titulo">EVENTOS</h1>
        <table class="contenido__tabla">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Ubicacion</th>
                    <th>Fecha Inicio</th>
                    <th>Fecha Fin</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="evento in eventos" :key="evento.id">
                    <td>{{ evento.id }}</td>
                    <td>{{ evento.nombre }}</td>
                    <td>{{ evento.descripcion }}</td>
                    <td>{{ evento.ubicacion }}</td>
                    <td>{{ new Date(evento.fecha_inicio).toLocaleDateString() }}</td>
                    <td>{{ new Date(evento.fecha_fin).toLocaleDateString() }}</td>
          <td>
            <button class="btn-editar" @click="abrirForm(evento)"><i class="fas fa-pencil-alt"></i></button>
                        <button class="btn-borrar" @click="borrarEvento(evento.id)"><i class="fas fa-trash"></i></button>
          </td>
        </tr>

            </tbody>
        </table>
        <div v-if="modalVisible" class="modal">
            <div class="modal-contenido">
                <h2>Editar Evento</h2>
                <label>Nombre:</label>
                <input type="text" v-model="eventoEditado.nombre" />
                
                <label>Descripcion:</label>
            <input type="text" v-model="eventoEditado.descripcion" />
            
            <label>Ubicacion:</label>
            <input type="text" v-model="eventoEditado.ubicacion" />


            <label>Ubicacion:</label>
            <input type="date" v-model="eventoEditado.fecha_inicio" />

            <label>fecha_fin:</label>
            <input type="date" v-model="eventoEditado.fecha_fin" />

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
import { useEventosStore } from '@/stores/eventos';
import type EventoDto from '@/stores/dtos/evento.dto';

const modalVisible = ref(false);
const eventoEditado = ref<EventoDto | null>(null);


const store = useEventosStore();
const { eventos, findAll, deleteEvento, updateEvento } = store;

onMounted(() => {
    findAll();
});


const abrirForm = (evento: EventoDto) => {
    eventoEditado.value = { ...evento };
    modalVisible.value = true;
}

const guardarCambios = async () => {
    if(eventoEditado.value) {
        await updateEvento(eventoEditado.value.id, eventoEditado.value);
        modalVisible.value = false;
    }
}

const cerrarFormulario = () => {
    modalVisible.value = false;
}


const borrarEvento = async (id: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar este Evento?")) {
        await deleteEvento(id);
    }
};

const formatoFecha = (fecha: Date) => {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(fecha);
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";
@import "@/assets/styles/_mixins.scss";


.contenido{
    margin-top: 5%;
    padding: 1.5%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: $color-darkgray;
    &__titulo{
            font-family:$titulo;
            font-size: 2.3rem;
            font-weight: bold;
            margin-bottom: 1%;
            color: $color-red;
    }
    &__tabla{
        color: white;
        font-size: 1.4rem;
    }
    th, td {
    padding: 15px 20px; 
    text-align: left;
    line-height: 1.4; 
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