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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="evento in eventos" :key="evento.id">
            <td>{{ evento.id }}</td>
            <td>{{ evento.nombre }}</td>
            <td>{{ evento.descripcion }}</td>
            <td>{{ evento.ubicacion }}</td>
            <td>{{ formatearFecha(evento.fecha_inicio) }}</td>
            <td>{{ formatearFecha(evento.fecha_fin) }}</td>
            <td>
              <button class="btn-editar" @click="editarEvento(evento)">
                <i class="fas fa-pencil-alt"></i>
              </button>
              <button class="btn-borrar" @click="borrarEvento(evento.id)">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <div v-if="eventoEditado" class="modal">
        <h3>Editar Evento</h3>
        <p>Nombre: {{ eventoEditado.nombre }}</p>
        <p>Ubicación: {{ eventoEditado.ubicacion }}</p>
        <button @click="cerrarEdicion">Cerrar</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref, computed } from "vue";
  import { useEventosStore } from "@/stores/eventos";
  import type EventoDto from "@/stores/dtos/evento.dto";
  
  const store = useEventosStore();
  const { eventos, findAll, deleteEvento } = store;
  
  // Variable para almacenar el evento seleccionado para editar
  const eventoEditado = ref<EventoDto | null>(null);
  
  onMounted(() => {
    findAll();
  });
  
  // Función para asignar un evento a la variable eventoEditado
  const editarEvento = (evento: EventoDto) => {
    eventoEditado.value = evento;
  };
  
  // Cerrar la edición
  const cerrarEdicion = () => {
    eventoEditado.value = null;
  };
  
  // Formateo de fechas
  const formatearFecha = (fecha: Date | string): string => {
    const fechaObjeto = fecha instanceof Date ? fecha : new Date(fecha);
    return fechaObjeto.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "2-digit",
      month: "short",
    });
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
    padding: 1.5%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: $color-darkgray;
  
    &__titulo {
      font-family: $titulo;
      font-size: 2.3rem;
      font-weight: bold;
      margin-bottom: 1%;
      color: $color-red;
    }
  
    &__tabla {
      color: white;
      font-size: 1.4rem;
    }
  
    th,
    td {
      padding: 15px 20px;
      text-align: left;
      line-height: 1.4;
    }
  
    .btn-editar,
    .btn-borrar {
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
  
  .modal {
    margin-top: 20px;
    padding: 10px;
    background: white;
    color: black;
    border-radius: 5px;
  }
  </style>
  