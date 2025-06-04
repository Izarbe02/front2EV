import { defineStore } from "pinia";
import { ref } from "vue";
import EventoDto from "@/stores/dtos/evento.dto";

export const useEventosGuardadosStore = defineStore("eventosGuardados", () => {
    const eventosGuardados = ref<EventoDto[]>([]);
    const estaGuardado = ref<boolean>(false);
    const successMessage = ref<string>("");
    const errorMessage = ref<string>("");

    async function guardarEvento(idUsuario: number, idEvento: number) {
        try {
            const response = await fetch(`http://localhost:8888/api/EventosGuardados/guardar?idUsuario=${idUsuario}&idEvento=${idEvento}`, {
                method: "POST"
            });

            if (!response.ok) throw new Error("Error al guardar evento");

            successMessage.value = "Evento guardado correctamente";
        } catch (error: any) {
            console.error(error);
            errorMessage.value = "No se pudo guardar el evento";
        }
    }

    async function quitarEvento(idUsuario: number, idEvento: number) {
        try {
            const response = await fetch(`http://localhost:8888/api/EventosGuardados/quitar?idUsuario=${idUsuario}&idEvento=${idEvento}`, {
                method: "DELETE"
            });

            if (!response.ok) throw new Error("Error al quitar evento");

            successMessage.value = "Evento quitado de favoritos";
        } catch (error: any) {
            console.error(error);
            errorMessage.value = "No se pudo quitar el evento";
        }
    }

    async function comprobarEventoGuardado(idUsuario: number, idEvento: number) {
        try {
            const response = await fetch(`http://localhost:8888/api/EventosGuardados/existe?idUsuario=${idUsuario}&idEvento=${idEvento}`);
            if (!response.ok) throw new Error("Error al comprobar evento");

            const result = await response.json();
            estaGuardado.value = result;
        } catch (error: any) {
            console.error(error);
            estaGuardado.value = false;
        }
    }

    async function cargarEventosGuardados(idUsuario: number) {
        try {
            const response = await fetch(`http://localhost:8888/api/EventosGuardados/${idUsuario}`);
            if (!response.ok) throw new Error("Error al obtener eventos guardados");

            const data = await response.json();
            eventosGuardados.value = data;
        } catch (error: any) {
            console.error(error);
            eventosGuardados.value = [];
        }
    }

    async function cargarEventosGuardadosOrdenados(idUsuario: number, criterio: string) {
        try {
            const response = await fetch(`http://localhost:8888/api/EventosGuardados/${idUsuario}/ordenados?criterio=${criterio}`);
            if (!response.ok) throw new Error("Error al obtener eventos ordenados");

            const data = await response.json();
            eventosGuardados.value = data;
        } catch (error: any) {
            console.error(error);
            eventosGuardados.value = [];
        }
    }

    return {
        eventosGuardados,
        estaGuardado,
        successMessage,
        errorMessage,
        guardarEvento,
        quitarEvento,
        comprobarEventoGuardado,
        cargarEventosGuardados,
        cargarEventosGuardadosOrdenados
    };
});
