import { defineStore } from "pinia";
import { ref } from "vue";
import type UsuarioDto from "@/stores/dtos/usuario.dto.ts";
import type { UsuarioLoginDto } from "./dtos/usuarioLogin.dto";


export const useUsuariosStore = defineStore("usuarios", () => {

  const usuarios = ref<UsuarioDto[]>([]);
  const currentUsuario = ref<UsuarioDto | null>(null);
  const usuarioLogeado = ref<UsuarioDto | null>(null);
  const tokenLogin = ref<string | null>(null)
  const errorMessage = ref<string>("");
  const successMessage = ref<string>("");

  async function findAll() {
    try {
      const response = await fetch("https://zaragozaconectaapi.retocsv.es/api/Usuario");
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
      const response = await fetch(`https://zaragozaconectaapi.retocsv.es/api/Usuario/${id}`);
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
      const response = await fetch("https://zaragozaconectaapi.retocsv.es/api/Usuario", {
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
    console.log(usuarioActualizado)

    if(usuarioActualizado == null){
      throw new Error("no hay usuario");
      
    }
    try {
      const response = await fetch(`https://zaragozaconectaapi.retocsv.es/api/Usuario/${id}`, {
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
      const response = await fetch(`https://zaragozaconectaapi.retocsv.es/api/Usuario/${id}`, {
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

  async function login(usuarioLogin: UsuarioLoginDto) {
    try {
      const response = await fetch("https://zaragozaconectaapi.retocsv.es/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioLogin),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al iniciar sesión: ${errorText || response.statusText}`);
      }

      const data: { token: string; usuario: UsuarioDto } | null = await response.json();

      if (data) {
        usuarioLogeado.value = data.usuario;
        tokenLogin.value = data.token;
        console.log(usuarioLogeado)
        console.log(tokenLogin)
        return true;
      } else {
        console.warn("Inicio de sesión exitoso, pero no se recibió información del usuario.");
      }
    } catch (error) {
      console.error("Error en login:", error);
    }
  }

  return {
    usuarios,
    currentUsuario,
    errorMessage,
    successMessage,
    usuarioLogeado,
    findAll,
    getUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    login
  };
});