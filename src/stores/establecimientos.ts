import { defineStore } from "pinia";
import { ref } from "vue";
import type EstablecimientoDto from "@/stores/dtos/establecimiento.dto.ts";

export const useEstablecimientosStore = defineStore("establecimientos", () => {

  const establecimientos = ref<EstablecimientoDto[]>([]);
  const currentEstablecimiento = ref<EstablecimientoDto | null>(null);
  const errorMessage = ref<string>("");
  const successMessage = ref<string>("");

  async function findAll() {
    try {
      const response = await fetch("http://localhost:8888/api/Establecimiento");
      if (!response.ok) throw new Error("Error al obtener establecimientos");

      const data = await response.json();
      establecimientos.value.splice(0, establecimientos.value.length, ...data);
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener establecimientos:", error);
    }
  }

  async function getEstablecimiento(id: number) {
    try {
      const response = await fetch(`http://localhost:8888/api/Establecimiento/${id}`);
      if (!response.ok) throw new Error("Error al obtener el establecimiento");

      const establecimiento = await response.json();
      currentEstablecimiento.value = establecimiento;
      return establecimiento;
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener el establecimiento:", error);
    }
  }

  async function createEstablecimiento(establecimiento: EstablecimientoDto) {
    try {
      const response = await fetch("http://localhost:8888/api/Establecimiento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(establecimiento),
      });
      if (!response.ok) throw new Error("Error al crear el establecimiento");

      const createdEstablecimiento = await response.json();
      establecimientos.value.push(createdEstablecimiento);
      successMessage.value = "Establecimiento creado correctamente";
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al crear el establecimiento:", error);
    }
  }

  async function updateEstablecimiento(id: number, establecimientoActualizado: EstablecimientoDto) {
    try {
      const response = await fetch(`http://localhost:8888/api/Establecimiento/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(establecimientoActualizado),
      });
      if (!response.ok) throw new Error("Error al actualizar el establecimiento");

      // Actualizamos la lista refrescando los establecimientos
      await findAll();
      successMessage.value = "Establecimiento actualizado correctamente";
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al actualizar el establecimiento:", error);
    }
  }

  async function deleteEstablecimiento(id: number) {
    try {
      const response = await fetch(`http://localhost:8888/api/Establecimiento/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar el establecimiento");

      establecimientos.value = establecimientos.value.filter(e => e.id !== id);
      successMessage.value = "Establecimiento eliminado correctamente";
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al eliminar el establecimiento:", error);
    }
  }

  return {
    establecimientos,
    currentEstablecimiento,
    errorMessage,
    successMessage,
    findAll,
    getEstablecimiento,
    createEstablecimiento,
    updateEstablecimiento,
    deleteEstablecimiento,
  };
});
