
import { defineStore } from "pinia";
import { ref } from "vue";
import type TematicaDto from "@/stores/dtos/tematica.dto";

export const useTematicasStore = defineStore("tematicas", () => {
  // Estado reactivo
  const tematicas = ref<TematicaDto[]>([]);
  const currentTematica = ref<TematicaDto | null>(null);
  const errorMessage = ref<string>("");
  const successMessage = ref<string>("");

  // Obtener todas las tematicas (GET: api/Tematica)
  async function findAll() {
    try {
      const response = await fetch("https://zaragozaconectaapi.retocsv.es/api/Tematica");
      if (!response.ok) throw new Error("Error al obtener tematicas");
      const data = await response.json();
      tematicas.value.splice(0, tematicas.value.length, ...data);
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener tematicas:", error);
    }
  }

  // Obtener una tematica por ID (GET: api/Tematica/{id})
  async function getTematica(id: number) {
    try {
      const response = await fetch(`https://zaragozaconectaapi.retocsv.es/api/Tematica/${id}`);
      if (!response.ok) throw new Error("Error al obtener la tematica");
      const data = await response.json();
      currentTematica.value = data;
      return data;
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener la tematica:", error);
    }
  }

  // Crear una nueva tematica (POST: api/Tematica)
  async function createTematica(tematica: TematicaDto) {
    try {
      const response = await fetch("https://zaragozaconectaapi.retocsv.es/api/Tematica", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tematica),
      });
      if (!response.ok) throw new Error("Error al crear la tematica");
      const createdTematica = await response.json();
      tematicas.value.push(createdTematica);
      successMessage.value = "Tematica creada correctamente";
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al crear la tematica:", error);
    }
  }

  // Actualizar una tematica (PUT: api/Tematica/{id})
  async function updateTematica(id: number, updatedTematica: TematicaDto) {
    try {
      const response = await fetch(`https://zaragozaconectaapi.retocsv.es/api/Tematica/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTematica),
      });
      if (!response.ok) throw new Error("Error al actualizar la tematica");
      await findAll(); // Refresca la lista de tematicas
      successMessage.value = "Tematica actualizada correctamente";
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al actualizar la tematica:", error);
    }
  }

  // Eliminar una tematica (DELETE: api/Tematica/{id})
  async function deleteTematica(id: number) {
    try {
      const response = await fetch(`https://zaragozaconectaapi.retocsv.es/api/Tematica/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar la tematica");
      tematicas.value = tematicas.value.filter(t => t.id !== id);
      successMessage.value = "Tematica eliminada correctamente";
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al eliminar la tematica:", error);
    }
  }

  return {
    tematicas,
    currentTematica,
    errorMessage,
    successMessage,
    findAll,
    getTematica,
    createTematica,
    updateTematica,
    deleteTematica,
  };
});
