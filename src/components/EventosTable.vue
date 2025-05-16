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
          <tr v-if="eventosFiltrados.length === 0">
  <td colspan="7">No tienes eventos disponibles</td>
</tr>

          <tr v-for="evento in eventosFiltrados" :key="evento.id">
            <td>{{ evento.id }}</td>
            <td>{{ evento.nombre }}</td>
            <td>{{ evento.descripcion }}</td>
            <td>{{ evento.ubicacion }}</td>
            <td>{{ formatearFecha(evento.fechaInicio) }}</td>
            <td>{{ formatearFecha(evento.fechaFin) }}</td>
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
  import { useUsuariosStore } from "@/stores/usuarios";
  import { useOrganizadoresStore } from "@/stores/organizadores";
  import type EventoDto from "@/stores/dtos/evento.dto";
  import { watchEffect } from "vue";

  
  const store = useEventosStore();
  const { eventos, findAll, deleteEvento } = store;
  
  const usuariosStore = useUsuariosStore();
  const organizadoresStore = useOrganizadoresStore();
  
  // Evento seleccionado para editar
  const eventoEditado = ref<EventoDto | null>(null);
  
  // ID del organizador logeado (si aplica)
  const idOrganizadorLogeado = computed(() => organizadoresStore.organizadorLogeado?.id ?? null);
  
  // Rol actual (usuario u organizador)
  const rolActual = computed(() =>
    usuariosStore.usuarioLogeado?.idRol ??
    organizadoresStore.organizadorLogeado?.idRol ??
    -1
  );
  
  // ✅ Filtrar eventos con verificación defensiva
  const eventosFiltrados = computed(() => {
  const lista = eventos ?? [];
  const rol = rolActual.value;
  const idOrg = idOrganizadorLogeado.value;

  // Debug opcional:
  console.log("ROL:", rol);
  console.log("ID ORG:", idOrg);
  console.log("EVENTOS DISPONIBLES:", lista.length);

  if (rol === 1) return lista;
  if (rol === 2 && idOrg !== null) {
    return lista.filter(e => e.idOrganizador  === idOrg);
  }
  return [];
});

onMounted(async () => {
  await findAll();
});

// ⚠️ Asegura que el organizador esté correctamente cargado desde localStorage
watchEffect(() => {
  const raw = localStorage.getItem("organizadorLogeado");
  if (raw && raw !== "undefined" && !organizadoresStore.organizadorLogeado) {
    try {
      organizadoresStore.organizadorLogeado = JSON.parse(raw);
    } catch (e) {
      console.warn("No se pudo parsear organizadorLogeado:", e);
    }
  }
});


  
  const editarEvento = (evento: EventoDto) => {
    eventoEditado.value = evento;
  };
  
  const cerrarEdicion = () => {
    eventoEditado.value = null;
  };
  
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
  