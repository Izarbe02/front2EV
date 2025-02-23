
import { defineStore } from "pinia";
import { ref } from "vue";
import ProductoDto from "@/stores/dtos/producto.dto";

export const useProductosStore = defineStore("productos", () => {
  // Estado reactivo
  const productos = ref<ProductoDto[]>([]);
  const currentProducto = ref<ProductoDto | null>(null);
  const errorMessage = ref<string>("");
  const successMessage = ref<string>("");

  // Obtener todos los productos (GET: api/Producto)
  async function findAll() {
    try {
      const response = await fetch("http://localhost:8888/api/Producto");
      if (!response.ok) throw new Error("Error al obtener productos");
      const data = await response.json();
      productos.value.splice(0, productos.value.length, ...data);
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener productos:", error);
    }
  }

  // Obtener un producto por ID (GET: api/Producto/{id})
  async function getProducto(id: number) {
    try {
      const response = await fetch(`http://localhost:8888/api/Producto/${id}`);
      if (!response.ok) throw new Error("Error al obtener el producto");
      const data = await response.json();
      currentProducto.value = data;
      return data;
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener el producto:", error);
    }
  }

  // Crear un nuevo producto (POST: api/Producto)
  async function createProducto(producto: ProductoDto) {
    try {
      const response = await fetch("http://localhost:8888/api/Producto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto),
      });
      if (!response.ok) throw new Error("Error al crear el producto");
      const createdProducto = await response.json();
      productos.value.push(createdProducto);
      successMessage.value = "Producto creado correctamente";
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al crear el producto:", error);
    }
  }

  // Actualizar un producto (PUT: api/Producto/{id})
  async function updateProducto(id: number, updatedProducto: ProductoDto) {
    try {
      const response = await fetch(`http://localhost:8888/api/Producto/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProducto),
      });
      if (!response.ok) throw new Error("Error al actualizar el producto");
      await findAll(); // Refresca la lista tras la actualización
      successMessage.value = "Producto actualizado correctamente";
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al actualizar el producto:", error);
    }
  }

  // Eliminar un producto (DELETE: api/Producto/{id})
  async function deleteProducto(id: number) {
    try {
      const response = await fetch(`http://localhost:8888/api/Producto/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar el producto");
      productos.value = productos.value.filter(p => p.id !== id);
      successMessage.value = "Producto eliminado correctamente";
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al eliminar el producto:", error);
    }
  }

  return {
    productos,
    currentProducto,
    errorMessage,
    successMessage,
    findAll,
    getProducto,
    createProducto,
    updateProducto,
    deleteProducto,
  };
});
