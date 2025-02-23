// src/stores/categoriaEventos.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import CategoriaEventoDto from "@/stores/dtos/categoriaEvento.dto";

export const useCategoriaEventosStore = defineStore("categoriaEventos", () => {
  // Estado reactivo
  const categorias = ref<CategoriaEventoDto[]>([]);
  const currentCategoria = ref<CategoriaEventoDto | null>(null);
  const errorMessage = ref<string>("");
  const successMessage = ref<string>("");

  // Obtener todas las categorías (GET: api/CategoriaEvento)
  async function findAll() {
    try {
      const response = await fetch("http://localhost:8888/api/CategoriaEvento");
      if (!response.ok) throw new Error("Error al obtener categorías");
      
      const data = await response.json();
      categorias.value.splice(0, categorias.value.length, ...data);
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener categorías:", error);
    }
  }

  // Obtener una categoría por ID (GET: api/CategoriaEvento/{id})
  async function getCategoria(id: number) {
    try {
      const response = await fetch(`http://localhost:8888/api/CategoriaEvento/${id}`);
      if (!response.ok) throw new Error("Error al obtener la categoría");
      
      const categoria = await response.json();
      currentCategoria.value = categoria;
      return categoria;
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener la categoría:", error);
    }
  }

  // Crear una nueva categoría (POST: api/CategoriaEvento)
  async function createCategoria(categoria: CategoriaEventoDto) {
    try {
      const response = await fetch("http://localhost:8888/api/CategoriaEvento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoria),
      });
      if (!response.ok) throw new Error("Error al crear la categoría");
      
      const createdCategoria = await response.json();
      categorias.value.push(createdCategoria);
      successMessage.value = "Categoría creada correctamente";
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al crear la categoría:", error);
    }
  }

  // Actualizar una categoría (PUT: api/CategoriaEvento/{id})
  async function updateCategoria(id: number, categoriaActualizada: CategoriaEventoDto) {
    try {
      const response = await fetch(`http://localhost:8888/api/CategoriaEvento/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoriaActualizada),
      });
      if (!response.ok) throw new Error("Error al actualizar la categoría");
      
      await findAll();
      successMessage.value = "Categoría actualizada correctamente";
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al actualizar la categoría:", error);
    }
  }

  // Eliminar una categoría (DELETE: api/CategoriaEvento/{id})
  async function deleteCategoria(id: number) {
    try {
      const response = await fetch(`http://localhost:8888/api/CategoriaEvento/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar la categoría");
      
      categorias.value = categorias.value.filter(cat => cat.id !== id);
      successMessage.value = "Categoría eliminada correctamente";
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al eliminar la categoría:", error);
    }
  }

  return {
    categorias,
    currentCategoria,
    errorMessage,
    successMessage,
    findAll,
    getCategoria,
    createCategoria,
    updateCategoria,
    deleteCategoria,
  };
});
