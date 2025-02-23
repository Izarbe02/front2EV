// src/stores/roles.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import RolDto from "@/stores/dtos/rol.dto";

export const useRolesStore = defineStore("roles", () => {
  // Estado reactivo
  const roles = ref<RolDto[]>([]);
  const currentRol = ref<RolDto | null>(null);
  const errorMessage = ref<string>("");
  const successMessage = ref<string>("");

  // Obtener todos los roles (GET: api/Rol)
  async function findAll() {
    try {
      const response = await fetch("http://localhost:8888/api/Rol");
      if (!response.ok) throw new Error("Error al obtener roles");
      const data = await response.json();
      roles.value.splice(0, roles.value.length, ...data);
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener roles:", error);
    }
  }

  // Obtener un rol por ID (GET: api/Rol/{id})
  async function getRol(id: number) {
    try {
      const response = await fetch(`http://localhost:8888/api/Rol/${id}`);
      if (!response.ok) throw new Error("Error al obtener el rol");
      const data = await response.json();
      currentRol.value = data;
      return data;
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener el rol:", error);
    }
  }

  // Crear un nuevo rol (POST: api/Rol)
  async function createRol(rol: RolDto) {
    try {
      const response = await fetch("http://localhost:8888/api/Rol", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rol),
      });
      if (!response.ok) throw new Error("Error al crear el rol");
      const createdRol = await response.json();
      roles.value.push(createdRol);
      successMessage.value = "Rol creado correctamente";
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al crear el rol:", error);
    }
  }

  // Actualizar un rol (PUT: api/Rol/{id})
  async function updateRol(id: number, updatedRol: RolDto) {
    try {
      const response = await fetch(`http://localhost:8888/api/Rol/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRol),
      });
      if (!response.ok) throw new Error("Error al actualizar el rol");
      // Refrescar la lista de roles
      await findAll();
      successMessage.value = "Rol actualizado correctamente";
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al actualizar el rol:", error);
    }
  }

  // Eliminar un rol (DELETE: api/Rol/{id})
  async function deleteRol(id: number) {
    try {
      const response = await fetch(`http://localhost:8888/api/Rol/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar el rol");
      roles.value = roles.value.filter(r => r.id !== id);
      successMessage.value = "Rol eliminado correctamente";
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al eliminar el rol:", error);
    }
  }

  return {
    roles,
    currentRol,
    errorMessage,
    successMessage,
    findAll,
    getRol,
    createRol,
    updateRol,
    deleteRol,
  };
});
