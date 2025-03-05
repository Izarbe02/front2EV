<template>
    <div class="contenido">
        <h1 class="contenido__titulo">EVENTOS</h1>
        <table class="contenido__tabla">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Ubicación</th>
                    <th>Fecha Inicio</th>
                    <th>Fecha Fin</th>
                    <th>ID Organizador</th>
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
                    <td>{{ evento.idOrganizador }}</td>
                    <td>
                        <button class="btn-editar" @click="abrirForm(evento)">
                            <i class="fas fa-pencil-alt"></i>
                        </button>
                        <button class="btn-borrar" @click="borrarEvento(evento.id)">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <button class="btn-crear" @click="abrirFormularioNuevo">Crear Evento</button>

        <div v-if="modalVisible" class="modal">
            <div class="modal-contenido">
                <h2>{{ esModoEdicion ? 'Editar Evento' : 'Crear Evento' }}</h2>

                <label>Nombre:</label>
                <input type="text" v-model="eventoEditado.nombre" />

                <label>Descripción:</label>
                <textarea v-model="eventoEditado.descripcion"></textarea>

                <label>Ubicación:</label>
                <input type="text" v-model="eventoEditado.ubicacion" />

                <label>Fecha Inicio:</label>
                <input type="date" v-model="eventoEditado.fecha_inicio" />

                <label>Fecha Fin:</label>
                <input type="date" v-model="eventoEditado.fecha_fin" />

                <label>Id Organizador:</label>
                <input type="text" v-model="eventoEditado.idOrganizador" />

                <div class="modal-botones">
                    <button @click="guardarCambios" :disabled="!eventoEditado">Guardar</button>
                    <button @click="cerrarFormulario">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useEventosStore } from '@/stores/eventos';
import type EventoDto from '@/stores/dtos/evento.dto';

const modalVisible = ref(false);
const eventoEditado = ref<EventoDto | null>(null);
const esModoEdicion = ref(false);

const store = useEventosStore();
const { eventos, findAll, deleteEvento, updateEvento, createEvento } = store;

onMounted(() => {
    findAll();
});

const abrirForm = (evento: EventoDto) => {
    eventoEditado.value = { ...evento };
    esModoEdicion.value = true;
    modalVisible.value = true;
};

const abrirFormularioNuevo = () => {
    eventoEditado.value = { id: 0, nombre: '', descripcion: '', ubicacion: '', fecha_inicio: '', fecha_fin: '', idOrganizador: 1 };
    esModoEdicion.value = false;
    modalVisible.value = true;
};

const guardarCambios = async () => {
    if (!eventoEditado.value) return;
    
    if (esModoEdicion.value) {
        await updateEvento(eventoEditado.value.id, eventoEditado.value);
    } else {
        await createEvento(eventoEditado.value);
    }
    modalVisible.value = false;
};

const cerrarFormulario = () => {
    modalVisible.value = false;
};

const borrarEvento = async (id: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar este evento?")) {
        await deleteEvento(id);
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
