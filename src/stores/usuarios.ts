// src/stores/usuarios.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import type UsuarioDto from "@/stores/dtos/usuario.dto.ts";

export const useUsuariosStore = defineStore("usuarios", () => {
  // Estado reactivo
  const usuarios = ref<UsuarioDto[]>([]);
  const currentUsuario = ref<UsuarioDto | null>(null);
  const errorMessage = ref<string>("");
  const successMessage = ref<string>("");

  // Obtener todos los usuarios (GET: api/Usuario)
  async function findAll() {
    try {
      const response = await fetch("http://localhost:8888/api/Usuario");
      if (!response.ok) throw new Error("Error al obtener usuarios");
      
      const data = await response.json();
      usuarios.value.splice(0, usuarios.value.length, ...data);
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener usuarios:", error);
    }
  }

  // Obtener un usuario por ID (GET: api/Usuario/{id})
  async function getUsuario(id: number) {
    try {
      const response = await fetch(`http://localhost:8888/api/Usuario/${id}`);
      if (!response.ok) throw new Error("Error al obtener el usuario");
      
      const usuario = await response.json();
      currentUsuario.value = usuario;
      return usuario;
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener el usuario:", error);
    }
  }

  // Crear un nuevo usuario (POST: api/Usuario)
  async function createUsuario(usuario: UsuarioDto) {
    try {
      const response = await fetch("http://localhost:8888/api/Usuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });
      if (!response.ok) throw new Error("Error al crear el usuario");
      
      const createdUsuario = await response.json();
      usuarios.value.push(createdUsuario);
      successMessage.value = "Usuario creado correctamente";
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al crear el usuario:", error);
    }
  }

  // Actualizar un usuario (PUT: api/Usuario/{id})
  async function updateUsuario(id: number, usuarioActualizado: UsuarioDto) {
    try {
      const response = await fetch(`http://localhost:8888/api/Usuario/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioActualizado),
      });
      if (!response.ok) throw new Error("Error al actualizar el usuario");
      
      // Actualizamos la lista refrescando los usuarios
      await findAll();
      successMessage.value = "Usuario actualizado correctamente";
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al actualizar el usuario:", error);
    }
  }

  // Eliminar un usuario (DELETE: api/Usuario/{id})
  async function deleteUsuario(id: number) {
    try {
      const response = await fetch(`http://localhost:8888/api/Usuario/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar el usuario");
      
      usuarios.value = usuarios.value.filter(u => u.id !== id);
      successMessage.value = "Usuario eliminado correctamente";
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al eliminar el usuario:", error);
    }
  }

  return {
    usuarios,
    currentUsuario,
    errorMessage,
    successMessage,
    findAll,
    getUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario,
  };
});
