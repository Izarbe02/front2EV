import { defineStore } from "pinia";
import { ref } from "vue";
import type ComentarioDto from "@/stores/dtos/comentario.dto";
import type ComentarioCreateDto from "@/stores/dtos/comentarioCrear.dto";
import type ComentarioUpdateDto from '@/stores/dtos/comentarioUpdate.dto'

export const useComentariosStore = defineStore("comentarios", () => {
  const comentarios = ref<ComentarioDto[]>([]);
  const currentComentario = ref<ComentarioDto | null>(null);
  const errorMessage = ref<string>("");
  const successMessage = ref<string>("");

  async function findAll() {
    try {
      const response = await fetch("https://zaragozaconectaapi.retocsv.es/api/Comentario");
      if (!response.ok) throw new Error("Error al obtener comentarios");
      const data = await response.json();
      comentarios.value.splice(0, comentarios.value.length, ...data);
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener comentarios:", error);
    }
  }

  async function getComentario(id: number) {
    try {
      const response = await fetch(`https://zaragozaconectaapi.retocsv.es/api/Comentario/${id}`);
      if (!response.ok) throw new Error("Error al obtener el comentario");
      const data = await response.json();
      currentComentario.value = data;
      return data;
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener el comentario:", error);
    }
  }

  async function fetchComentariosByEvento(eventoId: number) {
    try {
      const response = await fetch(`https://zaragozaconectaapi.retocsv.es/api/Comentario/evento/${eventoId}`);
      if (!response.ok) throw new Error("Error al obtener comentarios del evento");
      const data = await response.json();
      comentarios.value = data;
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al cargar comentarios:", error);
    }
  }

  async function createComentario(comentario: ComentarioCreateDto) {
    try {
      const response = await fetch("https://zaragozaconectaapi.retocsv.es/api/Comentario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comentario),
      });
      if (!response.ok) throw new Error("Error al crear el comentario");
      const createdComentario = await response.json();
      comentarios.value.push(createdComentario);
      successMessage.value = "Comentario creado correctamente";
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al crear el comentario:", error);
    }
  }

  async function updateComentario(comentario: ComentarioUpdateDto) {

    try {
      const response = await fetch(`https://zaragozaconectaapi.retocsv.es/api/Comentario/${comentario.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comentario),
      });
      if (!response.ok) throw new Error("Error al actualizar el comentario");
      successMessage.value = "Comentario actualizado correctamente";
      await fetchComentariosByEvento(comentario.idEvento);

    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al actualizar el comentario:", error);
    }
  }
  // Eliminar un comentario (DELETE: api/Comentario/{id})
  async function deleteComentario(id: number) {
    try {
      const response = await fetch(`https://zaragozaconectaapi.retocsv.es/api/Comentario/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar el comentario");
      comentarios.value = comentarios.value.filter(c => c.id !== id);
      successMessage.value = "Comentario eliminado correctamente";
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al eliminar el comentario:", error);
    }
  }

  return {
    comentarios,
    currentComentario,
    errorMessage,
    successMessage,
    findAll,
    getComentario,
    fetchComentariosByEvento,
    createComentario,
    updateComentario,
    deleteComentario,
  };
});
