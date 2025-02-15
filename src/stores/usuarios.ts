// stores/usersStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import UsuarioDto from "@/stores/dtos/usuario.dto"; // DTO para tipar los usuarios

export const useUsuariosStore = defineStore("usuarios", () => {
    // Estado reactivo
    const usuarios = ref<UsuarioDto[]>([]);
    const currentUser = ref<UsuarioDto | null>(null);
    const errorMessage = ref<string>("");
    const successMessage = ref<string>("");

    // Obtener todos los usuarios del backend
    async function findAll() {
        try {
            const response = await fetch("http://localhost:4444/api/usuario");
            if (!response.ok) throw new Error("Error al obtener usuarios");

            const data = await response.json();
            usuarios.value.splice(0, usuarios.value.length, ...data);
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
        }
    }

    // Crear un nuevo usuario
    async function createUser(user: UsuarioDto) {
        try {
            const response = await fetch("http://localhost:4444/api/usuario", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });

            if (!response.ok) throw new Error("Error al crear usuario");

            usuarios.value.push(user);
        } catch (error) {
            console.error("Error al crear usuario:", error);
        }
    }

    // Actualizar un usuario existente
    async function updateUser(userId: number, updatedData: Partial<UsuarioDto>) {
        try {
            const response = await fetch(`http://localhost:4444/api/usuario/${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) throw new Error("Error al actualizar usuario");

            // Actualizar el usuario en el array reactivo
            const index = usuarios.value.findIndex((u) => u.id === userId);
            if (index !== -1) {
                usuarios.value[index] = { ...usuarios.value[index], ...updatedData };
            }
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
        }
    }

    // Eliminar un usuario
    async function deleteUser(userId: number) {
        try {
            const response = await fetch(`http://localhost:4444/api/usuario/${userId}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Error al eliminar usuario");

            usuarios.value = usuarios.value.filter((u) => u.id !== userId);
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
        }
    }

    // Registrar sesión (Register)
    async function RegisterUser(firstName: string, contrasenia: string) {
        try {
            const response = await fetch("http://localhost:4444/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstName, contrasenia }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Error en el inicio de sesión");

            currentUser.value = { id: -1, Username: firstName, Contrasenia: contrasenia };
            successMessage.value = "Login exitoso. Redirigiendo...";
            errorMessage.value = "";
        } catch (error: any) {
            console.error("Error al iniciar sesión:", error);
            errorMessage.value = error.message || "Error de conexión";
            successMessage.value = "";
        }
    }

    return {
        usuarios,
        currentUser,
        errorMessage,
        successMessage,
        findAll,
        createUser,
        updateUser,
        deleteUser,
        RegisterUser,
    };
});
