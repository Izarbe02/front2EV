import { defineStore } from "pinia";
import { ref } from "vue";
import type ProductoDto from "@/stores/dtos/producto.dto.ts";

export const useProductosStore = defineStore("productos", () => {

  const productos = ref<ProductoDto[]>([]);
  const currentProducto = ref<ProductoDto | null>(null);
  const errorMessage = ref<string>("");
  const successMessage = ref<string>("");

  async function findAll() {
    try {
      const response = await fetch("https://zaragozaconectaapi.retocsv.es/api/Producto");
      if (!response.ok) throw new Error("Error al obtener productos");

      const data = await response.json();
      productos.value.splice(0, productos.value.length, ...data);
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener productos:", error);
    }
  }

  async function getProducto(id: number) {
    try {
      const response = await fetch(`https://zaragozaconectaapi.retocsv.es/api/Producto/${id}`);
      if (!response.ok) throw new Error("Error al obtener el producto");

      const producto = await response.json();
      currentProducto.value = producto;
      return producto;
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener el producto:", error);
    }
  }

  async function createProducto(producto: ProductoDto) {
    try {
      const response = await fetch("https://zaragozaconectaapi.retocsv.es/api/Producto", {
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

  async function updateProducto(id: number, productoActualizado: ProductoDto) {
    try {
      const response = await fetch(`https://zaragozaconectaapi.retocsv.es/api/Producto/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productoActualizado),
      });
      if (!response.ok) throw new Error("Error al actualizar el producto");

      // Actualizamos la lista refrescando los productos
      await findAll();
      successMessage.value = "Producto actualizado correctamente";
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al actualizar el producto:", error);
    }
  }

  async function deleteProducto(id: number) {
    try {
      const response = await fetch(`https://zaragozaconectaapi.retocsv.es/api/Producto/${id}`, {
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
