
import { defineStore } from "pinia";
import { ref } from "vue";
import type CategoriaProductoDto from "@/stores/dtos/categoriaProducto.dto";

export const useCategoriaProductosStore = defineStore("categoriaProductos", () => {
  // Estado reactivo
  const categorias = ref<CategoriaProductoDto[]>([]);
  const currentCategoria = ref<CategoriaProductoDto | null>(null);
  const errorMessage = ref<string>("");
  const successMessage = ref<string>("");

  // Obtener todas las categorías (GET: api/CategoriaProducto)
  async function findAll() {
    try {
      const response = await fetch("https://zaragozaconectaapi.retocsv.es/api/CategoriaProducto");
      if (!response.ok) throw new Error("Error al obtener categorías");

      const data = await response.json();
      categorias.value.splice(0, categorias.value.length, ...data);
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener categorías:", error);
    }
  }

  // Obtener una categoría por ID (GET: api/CategoriaProducto/{id})
  async function getCategoria(id: number) {
    try {
      const response = await fetch(`https://zaragozaconectaapi.retocsv.es/api/CategoriaProducto/${id}`);
      if (!response.ok) throw new Error("Error al obtener la categoría");

      const data = await response.json();
      currentCategoria.value = data;
      return data;
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener la categoría:", error);
    }
  }

  // Crear una nueva categoría (POST: api/CategoriaProducto)
  async function createCategoria(categoria: CategoriaProductoDto) {
    try {
      const response = await fetch("https://zaragozaconectaapi.retocsv.es/api/CategoriaProducto", {
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

  // Actualizar una categoría (PUT: api/CategoriaProducto/{id})
  async function updateCategoria(id: number, updatedCategoria: CategoriaProductoDto) {
    try {
      const response = await fetch(`https://zaragozaconectaapi.retocsv.es/api/CategoriaProducto/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCategoria),
      });
      if (!response.ok) throw new Error("Error al actualizar la categoría");

      await findAll(); // Refrescar la lista de categorías
      successMessage.value = "Categoría actualizada correctamente";
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al actualizar la categoría:", error);
    }
  }

  // Eliminar una categoría (DELETE: api/CategoriaProducto/{id})
  async function deleteCategoria(id: number) {
    try {
      const response = await fetch(`https://zaragozaconectaapi.retocsv.es/api/CategoriaProducto/${id}`, {
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
