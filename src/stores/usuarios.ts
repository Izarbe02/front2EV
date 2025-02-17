// stores/usersStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import UsuarioDto from "@/stores/dtos/usuario.dto"; // DTO para tipar los usuarios
import type { StringMappingType } from "typescript";

export const useUsuariosStore = defineStore("usuarios", () => {
    // Estado reactivo
    const usuarios = ref<UsuarioDto[]>([]);
    const currentUser = ref<UsuarioDto | null>(null);
    const errorMessage = ref<string>("");
    const successMessage = ref<string>("");

    const router = useRouter();

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

    // Registrar sesión (Register)
    async function nRegisterUser(firstName: string, contrasenia: string) {
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

    async function RegisterUser(usuario: UsuarioDto) {
        try {
            const response = await fetch(`http://localhost:4444/api/login?username=${username}&contrasenia=${contrasenia}`)
        
            if(response.ok) {
                throw new Error("Este usuario ya existe");
            }

            const data = await response.json()

            currentUser.value = data.username
            errorMessage.value = ""
            
            const responsed = await fetch("http://localhost:4444/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usuario }),
            });

            router.push("/homepage")
        } catch (error:any) {
            errorMessage.value = "Error al crear usuario.";
        }
    }


    async function loginUser(username: string, contrasenia: string) {
        try {
            const response = await fetch(`http://localhost:4444/api/login?username=${username}&contrasenia=${contrasenia}`)
        
            if(!response.ok) {
                throw new Error("Credenciales incorrectas");
            }

            const data = await response.json()

            currentUser.value = data.username
            errorMessage.value = ""
        
            router.push("/homepage")
        } catch (error:any) {
            errorMessage.value = "Error al iniciar sesión.";
        }
    }

    return {
        usuarios,
        currentUser,
        errorMessage,
        successMessage,
        findAll,
        createUser,
        RegisterUser,
        loginUser
    };
});
