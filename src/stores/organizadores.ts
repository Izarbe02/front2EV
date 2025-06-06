import { defineStore } from "pinia";
import { ref } from "vue";
import type OrganizadorDto from "@/stores/dtos/organizador.dto";
import type { UsuarioLoginDto } from "@/stores/dtos/usuarioLogin.dto";

export const useOrganizadoresStore = defineStore("organizadores", () => {
  const organizadores = ref<OrganizadorDto[]>([]);
  const currentOrganizador = ref<OrganizadorDto | null>(null);

  let organizadorGuardado: OrganizadorDto | null = null;
  try {
    const raw = localStorage.getItem("organizadorLogeado");
    if (raw && raw !== "undefined") {
      organizadorGuardado = JSON.parse(raw);
    }
  } catch (error: any) {
    console.warn("Error al parsear organizadorLogeado:", error);
  }

  const organizadorLogeado = ref<OrganizadorDto | null>(organizadorGuardado);
  const tokenLoginOrganizador = ref<string | null>(localStorage.getItem("tokenLoginOrganizador"));

  const errorMessage = ref<string>("");
  const successMessage = ref<string>("");

  async function findAll() {
    try {
      const response = await fetch("https://zaragozaconectaapi.retocsv.es/api/Organizador");
      if (!response.ok) throw new Error("Error al obtener organizadores");

      const data = await response.json();
      organizadores.value.splice(0, organizadores.value.length, ...data);
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener organizadores:", error);
    }
  }

  async function getOrganizador(id: number) {
    try {
      const response = await fetch(`https://zaragozaconectaapi.retocsv.es/api/Organizador/${id}`);
      if (!response.ok) throw new Error("Error al obtener organizador");

      currentOrganizador.value = await response.json();
      return currentOrganizador.value;
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener organizador:", error);
      return null;
    }
  }

  async function createEstablecimiento(organizador: OrganizadorDto) {
    try {
      const response = await fetch("https://zaragozaconectaapi.retocsv.es/api/Organizador", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(organizador),
      });
      if (!response.ok) throw new Error("Error al crear organizador");

      const created = await response.json();
      organizadores.value.push(created);
      successMessage.value = "Organizador creado correctamente";
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al crear organizador:", error);
    }
  }

  async function updateEstablecimiento(id: number, updated: OrganizadorDto) {
    try {
      const response = await fetch(`https://zaragozaconectaapi.retocsv.es/api/Organizador/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (!response.ok) throw new Error("Error al actualizar organizador");

      await findAll();

      if (organizadorLogeado.value?.id === id) {
        organizadorLogeado.value = updated;
        localStorage.setItem("organizadorLogeado", JSON.stringify(updated));
      }

      successMessage.value = "Organizador actualizado correctamente";
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al actualizar organizador:", error);
    }
  }

  async function deleteEstablecimiento(id: number) {
    try {
      const response = await fetch(`https://zaragozaconectaapi.retocsv.es/api/Organizador/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar organizador");

      organizadores.value = organizadores.value.filter((o) => o.id !== id);
      successMessage.value = "Organizador eliminado correctamente";
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al eliminar organizador:", error);
    }
  }

  async function loginOrganizador(loginDto: UsuarioLoginDto) {
    try {
      const response = await fetch("https://zaragozaconectaapi.retocsv.es/api/auth/login-organizador", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginDto),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al iniciar sesión: ${errorText || response.statusText}`);
      }

      const data: { token: string; organizador: OrganizadorDto } = await response.json();

      organizadorLogeado.value = data.organizador;
      tokenLoginOrganizador.value = data.token;

      localStorage.setItem("organizadorLogeado", JSON.stringify(data.organizador));
      localStorage.setItem("tokenLoginOrganizador", data.token);

      return true;
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error en login de organizador:", error);
      return false;
    }
  }

  function logoutOrganizador() {
    organizadorLogeado.value = null;
    tokenLoginOrganizador.value = null;
    localStorage.removeItem("organizadorLogeado");
    localStorage.removeItem("tokenLoginOrganizador");
  }

  async function updateOrganizadorConImagen(id: number, formData: FormData) {
    try {
      const response = await fetch(`https://zaragozaconectaapi.retocsv.es/api/Organizador/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error("Error al actualizar organizador con imagen: " + errorText);
      }

      const actualizado = await response.json();
      successMessage.value = "Organizador actualizado correctamente";

      if (organizadorLogeado.value?.id === id) {
        organizadorLogeado.value = actualizado;
        localStorage.setItem("organizadorLogeado", JSON.stringify(actualizado));
      }

      return actualizado;
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al actualizar organizador con imagen:", error);
      return null;
    }
  }

  return {
    organizadores,
    currentOrganizador,
    organizadorLogeado,
    tokenLoginOrganizador,
    errorMessage,
    successMessage,
    findAll,
    getOrganizador,
    createEstablecimiento,
    updateEstablecimiento,
    deleteEstablecimiento,
    loginOrganizador,
    logoutOrganizador,
    updateOrganizadorConImagen,
  };
});
