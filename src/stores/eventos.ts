import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import EventoDto from "@/stores/dtos/evento.dto"; // DTO para tipar los eventos
import type { StringMappingType } from "typescript";


export const useEventosStore = defineStore("eventos", () => {
    // Estado reactivo
    const eventos = ref<EventoDto[]>([]);
    const currentUser = ref<EventoDto | null>(null);
    const errorMessage = ref<string>("");
    const successMessage = ref<string>("");

    const router = useRouter();

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

    // Crear un nuevo evento
    async function createEvento(evento: EventoDto) {
        try {
            const response = await fetch("http://localhost:8888/api/evento", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(evento),
            });

            if (!response.ok) throw new Error("Error al crear evento");

            eventos.value.push(evento);
        } catch (error) {
            console.error("Error al crear evento:", error);
        }
    }

    // Borrar un nuevo evento
    async function deleteEvento(id: number) {
        try {
            const response = await fetch(`http://localhost:8888/api/Evento/${id}`, {
                method: "DELETE"
            });
            eventos.value = eventos.value.filter(e => e.id !== id);

        } catch (error) {
            console.error("Error al obtener eventos:", error);
        }
    }


        async function updateEvento(id: number, eventoActualizado: EventoDto) {
            try {
              await fetch(`http://localhost:4444/api/evento/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(eventoActualizado),
              });
              await findAll(); // Refresca la lista después de actualizar
            } catch (error) {
              console.error("Error al actualizar evento:", error);
            }
          }
        }
)
;