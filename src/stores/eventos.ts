import { defineStore } from "pinia";
import { ref, nextTick } from "vue";
import { useRouter } from "vue-router";
import EventoDto from "@/stores/dtos/evento.dto";
import EventoInfoDto from "@/stores/dtos/eventoInfo.dto";

export const useEventosStore = defineStore("eventos", () => {
    // Estado reactivo
    const eventos = ref<EventoDto[]>([]);
    const eventosFiltrados = ref<EventoDto[]>([]);
    const hayEventosFiltrados = ref<boolean>(false);
    const currentUser = ref<EventoDto | null>(null);
    const eventoInfo = ref<EventoInfoDto | null>(null);
    const eventosProximos = ref<EventoDto[]>([]);
    const errorMessage = ref<string>("");
    const successMessage = ref<string>("");


    // Obtener todos los eventos del backend
    async function findAll() {
        try {
            const response = await fetch("http://localhost:8888/api/evento");
            if (!response.ok) throw new Error("Error al obtener eventos");

            const data = await response.json();
            eventos.value.splice(0, eventos.value.length, ...data);
        } catch (error) {
            console.error("Error al obtener eventos:", error);
        }
    }

    async function proximosEventos() {
        try {
            const response = await fetch("http://localhost:8888/api/Evento/proximos");
            if (!response.ok) throw new Error("Error al obtener eventos");

            const data = await response.json();
            eventosProximos.value = data;
            eventosProximos.value.splice(0, eventosProximos.value.length, ...data);
        } catch (error) {
            console.error("Error al obtener eventos:", error);
        }
    }

    // Crear un nuevo evento
    async function createEvento(evento: EventoDto) {
        try {
            const response = await fetch("http://localhost:8888/api/Evento", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(evento),
            });

            if (!response.ok) throw new Error("Error al crear evento");

            const createdEvento = await response.json();
            eventos.value.push(createdEvento);
        } catch (error) {
            console.error("Error al crear evento:", error);
        }
    }

    // Borrar un evento
    async function deleteEvento(id: number) {
        try {
            const response = await fetch(`http://localhost:8888/api/evento/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Error al eliminar evento");

            eventos.value = eventos.value.filter(e => e.id !== id);
        } catch (error) {
            console.error("Error al eliminar evento:", error);
        }
    }

    // Actualizar un evento
    async function updateEvento(id: number, eventoActualizado: EventoDto) {
        try {
            const response = await fetch(`http://localhost:8888/api/evento/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(eventoActualizado),
            });

            if (!response.ok) throw new Error("Error al actualizar evento");

            await findAll(); // Refresca la lista después de actualizar
        } catch (error) {
            console.error("Error al actualizar evento:", error);
        }
    }

    // Obtener un evento por ID
    async function filtroEvento(id: number) {
        try {
            const response = await fetch(`http://localhost:8888/api/evento/${id}`);
            if (!response.ok) throw new Error("Error al obtener el evento");

            const evento = await response.json();
            eventos.value = eventos.value.filter(e => e.id !== id);
            eventos.value.push(evento);
        } catch (error) {
            console.error("Error al obtener el evento:", error);
        }
    }

    // Obtener eventos por organizador
    async function getEventoPorOrganizador(organizador: string) {
        try {
            const response = await fetch(`http://localhost:8888/api/evento/organizador/${organizador}`);
            if (!response.ok) throw new Error("Error al obtener eventos por organizador");

            const data = await response.json();
            eventos.value = data;
        } catch (error) {
            console.error("Error al obtener eventos por organizador:", error);
        }
    }

    // Obtener eventos por categoría
    async function getEventoPorCategoria(categoria: string) {
        try {
            const response = await fetch(`http://localhost:8888/api/evento/categoria/${categoria}`);
            if (!response.ok) throw new Error("Error al obtener eventos por categoría");

            const data = await response.json();
            eventos.value = data;
        } catch (error) {
            console.error("Error al obtener eventos por categoría:", error);
        }
    }


    async function getEventoPorIdORganizador(idorganizador: number) {
        try {
            
            const response = await fetch(`http://localhost:8888/api/Evento/organizadorid/${idorganizador}`);
            if (!response.ok) throw new Error("Error al obtener eventos por organizador");
    
            const data = await response.json();
            
            console.log("Eventos recibidos en la API:", data);
    
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error("Error al obtener eventos:", error);
            return []; 
        }
    }
    
    
    
    
    
    
    // Obtener información detallada de un evento
    async function getInfoEvento(id: number) {
        try {
            const response = await fetch(`http://localhost:8888/api/Evento/DetalleEvento?id=${id}`);
            if (!response.ok) throw new Error("Error al obtener detalles del evento");

            const eventoInfo = await response.json();
            return eventoInfo;
        } catch (error) {
            console.error("Error al obtener detalles del evento:", error);
        }
    }

    // Buscador de eventos
    async function buscadorEvento(busqueda: string) {
        try {
            const response = await fetch(`http://localhost:8888/api/Evento/BuscadorEvento/${busqueda}`);
            if (!response.ok) throw new Error("Error en la búsqueda de eventos");

            const data = await response.json();
            eventosFiltrados.value = data;
            hayEventosFiltrados.value = eventosFiltrados.value.length > 0;
        } catch (error) {
            console.error("Error en la búsqueda de eventos:", error);
            eventosFiltrados.value = [];
            hayEventosFiltrados.value = false;
        }
    }

    return {
        eventos,
        currentUser,
        errorMessage,
        successMessage,
        eventoInfo,
        findAll,
        createEvento,
        deleteEvento,
        updateEvento,
        filtroEvento,
        getEventoPorOrganizador,
        getEventoPorCategoria,
        getInfoEvento,
        buscadorEvento,
        hayEventosFiltrados,
        eventosFiltrados,
        eventosProximos,
        proximosEventos,
        getEventoPorIdORganizador
    };
});
