// src/stores/patrocinador.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import type PatrocinadorDto from "@/stores/dtos/patrocinadores.dto";

export const usePatrocinadorStore = defineStore("patrocinadores", () => {
  // Estado reactivo
  const patrocinadores = ref<PatrocinadorDto[]>([]);
  const currentPatrocinador = ref<PatrocinadorDto | null>(null);
  const errorMessage = ref<string>("");
  const successMessage = ref<string>("");

  // Obtener todos los patrocinadores (GET: api/patrocinador)
  async function findAll() {
    try {
      const response = await fetch("http://localhost:8888/api/Patrocinador");
      if (!response.ok) throw new Error("Error al obtener patrocinadores");
      const data = await response.json();
      patrocinadores.value.splice(0, patrocinadores.value.length, ...data);
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener patrocinadores:", error);
    }
  }

  // Obtener un patrocinador por ID (GET: api/Patrocinador/{id})
  async function getPatrocinador(id: number) {
    try {
      const response = await fetch(`http://localhatrocinador:8888/api/Patrocinador/${id}`);
      if (!response.ok) throw new Error("Error al obtener el patrocinador");
      const data = await response.json();
      currentPatrocinador.value = data;
      return data;
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener el patrocinador:", error);
    }
  }

  // Crear un nuevo patrocinador (Patrocinador: api/Patrocinador)
  async function createPatrocinador(patrocinador: PatrocinadorDto) {
    try {
      const response = await fetch("http://localhatrocinador:8888/api/Patrocinador", {
        method: "Patrocinador",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patrocinador),
      });
      if (!response.ok) throw new Error("Error al crear el patrocinador");
      const createdPatrocinador = await response.json();
      patrocinadores.value.push(createdPatrocinador);
      successMessage.value = "Patrocinador creado correctamente";
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al crear el patrocinador:", error);
    }
  }

  // Actualizar un patrocinador (PUT: api/Patrocinador/{id})
  async function updatePatrocinador(id: number, updatedPatrocinador: PatrocinadorDto) {
    try {
      const response = await fetch(`http://localhatrocinador:8888/api/Patrocinador/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPatrocinador),
      });
      if (!response.ok) throw new Error("Error al actualizar el patrocinador");
      await findAll(); // Actualiza la lista de patrocinadores tras la modificación
      successMessage.value = "Patrocinador actualizado correctamente";
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al actualizar el patrocinador:", error);
    }
  }

  // Eliminar un patrocinador (DELETE: api/Patrocinador/{id})
  async function deletePatrocinador(id: number) {
    try {
      const response = await fetch(`http://localhatrocinador:8888/api/Patrocinador/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar el patrocinador");
      patrocinadores.value = patrocinadores.value.filter(p => p.id !== id);
      successMessage.value = "Patrocinador eliminado correctamente";
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al eliminar el patrocinador:", error);
    }
  }

  return {
    patrocinadores,
    currentPatrocinador,
    errorMessage,
    successMessage,
    findAll,
    getPatrocinador,
    createPatrocinador,
    updatePatrocinador,
    deletePatrocinador,
  };
});
