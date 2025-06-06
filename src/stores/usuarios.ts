import { defineStore } from "pinia";
import { ref } from "vue";
import type UsuarioDto from "@/stores/dtos/usuario.dto.ts";
import type { UsuarioLoginDto } from "./dtos/usuarioLogin.dto";

export const useUsuariosStore = defineStore("usuarios", () => {
  const usuarios = ref<UsuarioDto[]>([]);
  const currentUsuario = ref<UsuarioDto | null>(null);

  let usuarioGuardado: UsuarioDto | null = null;
  try {
    const raw = localStorage.getItem("usuarioLogeado");
    if (raw && raw !== "undefined") {
      usuarioGuardado = JSON.parse(raw);
    }
  } catch (error: any) {
    console.warn("Error al parsear usuarioLogeado:", error);
  }

  const usuarioLogeado = ref<UsuarioDto | null>(usuarioGuardado);
  const tokenLogin = ref<string | null>(localStorage.getItem("tokenLogin"));
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
      return null; // ✅ Añadido para corregir TS7030
    }
  }

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

  async function updateUsuario(id: number, usuarioActualizado: UsuarioDto) {
    if (!usuarioActualizado) throw new Error("No hay usuario");

    try {
      const response = await fetch(`https://zaragozaconectaapi.retocsv.es/api/Usuario/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioActualizado),
      });
      if (!response.ok) throw new Error("Error al actualizar el usuario");

      await findAll();
      usuarioLogeado.value = usuarioActualizado;
      localStorage.setItem("usuarioLogeado", JSON.stringify(usuarioActualizado));
      successMessage.value = "Usuario actualizado correctamente";
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al actualizar el usuario:", error);
    }
  }

  async function deleteUsuario(id: number) {
    try {
      const response = await fetch(`https://zaragozaconectaapi.retocsv.es/api/Usuario/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar el usuario");

      usuarios.value = usuarios.value.filter((u) => u.id !== id);
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

        localStorage.setItem("usuarioLogeado", JSON.stringify(data.usuario));
        localStorage.setItem("tokenLogin", data.token);

        return true;
      }

      return false; // ✅ Si no hay `data`, retornamos algo
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error en login:", error);
      return false; // ✅ Añadido para cubrir todos los caminos
    }
  }

  function logout() {
    usuarioLogeado.value = null;
    tokenLogin.value = null;
    localStorage.removeItem("usuarioLogeado");
    localStorage.removeItem("tokenLogin");
  }

  return {
    usuarios,
    currentUsuario,
    usuarioLogeado,
    tokenLogin,
    errorMessage,
    successMessage,
    findAll,
    getUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    login,
    logout
  };
});
