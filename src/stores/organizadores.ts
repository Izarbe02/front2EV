
import { defineStore } from "pinia";
import { ref } from "vue";
import type OrganizadorDto from "@/stores/dtos/organizador.dto";

export const useOrganizadoresStore = defineStore("organizadores", () => {
  // Estado reactivo
  const organizadores = ref<OrganizadorDto[]>([]);
  const currentOrganizador = ref<OrganizadorDto | null>(null);
  const errorMessage = ref<string>("");
  const successMessage = ref<string>("");

  // Obtener todos los establecimientos (GET: api/Organizador)
  async function findAll() {
    try {
      const response = await fetch("http://localhost:8888/api/Organizador");
      if (!response.ok) throw new Error("Error al obtener establecimientos");

      const data = await response.json();
      organizadores.value.splice(0, organizadores.value.length, ...data);
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener establecimientos:", error);
    }
  }

  // Obtener un establecimiento por ID (GET: api/Organizador/{id})
  async function getOrganizador(id: number) {
    try {
      const response = await fetch(`http://localhost:8888/api/Organizador/${id}`);
      if (!response.ok) throw new Error("Error al obtener organizador");

      currentOrganizador.value = await response.json();
      return currentOrganizador.value;
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener establecimiento:", error);
    }
  }

  // Crear un nuevo establecimiento (POST: api/Organizador)
  async function createEstablecimiento(establecimiento: OrganizadorDto) {
    try {
      const response = await fetch("http://localhost:8888/api/Organizador", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(establecimiento),
      });
      if (!response.ok) throw new Error("Error al crear establecimiento");

      const createdEstablecimiento = await response.json();
      organizadores.value.push(createdEstablecimiento);
      successMessage.value = "Establecimiento creado correctamente";
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al crear establecimiento:", error);
    }
  }

  // Actualizar un establecimiento (PUT: api/Organizador/{id})
  async function updateEstablecimiento(id: number, updatedEstablecimiento: OrganizadorDto) {
    try {
      const response = await fetch(`http://localhost:8888/api/Organizador/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEstablecimiento),
      });
      if (!response.ok) throw new Error("Error al actualizar establecimiento");

      // Opcional: refrescar la lista actualizando todos los establecimientos
      await findAll();
      successMessage.value = "Establecimiento actualizado correctamente";
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al actualizar establecimiento:", error);
    }
  }

  // Eliminar un establecimiento (DELETE: api/Organizador/{id})
  async function deleteEstablecimiento(id: number) {
    try {
      const response = await fetch(`http://localhost:8888/api/Organizador/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar establecimiento");

      organizadores.value = organizadores.value.filter(e => e.id !== id);
      successMessage.value = "Establecimiento eliminado correctamente";
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al eliminar establecimiento:", error);
    }
  }

  return {
    organizadores,
    currentOrganizador,
    errorMessage,
    successMessage,
    findAll,
    getOrganizador,
    createEstablecimiento,
    updateEstablecimiento,
    deleteEstablecimiento,
  };
});
