import { defineStore } from 'pinia';
import { ref } from 'vue';
import type UsuarioOrganizadorDto from "@/stores/dtos/UsuarioOrganizador.dto";
import type OrganizadorDto from '@/stores/dtos/organizador.dto';
import type EventoDto from '@/stores/dtos/evento.dto';

export const useUsuariosOrganizadoresStore = defineStore('usuariosOrganizadores', () => {
  const organizadoresSeguidos = ref<OrganizadorDto[]>([]);
  const eventosRecientesSeguidos = ref<EventoDto[]>([]);
  const numSeguidores = ref<number>(0);
  const sigueOrganizador = ref<boolean>(false);

  const followOrganizador = async (dto: UsuarioOrganizadorDto) => {
    console.log(dto);

    try {
      const res = await fetch(`http://localhost:8888/api/UsuarioOrganizador/follow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto) // puede incluir opcionalmente dto.fechaSeguimiento
      });
      sigueOrganizador.value = res.ok;
    } catch (error) {
      console.error("Error al seguir al organizador:", error);
    }
  };

  const unfollowOrganizador = async (dto: UsuarioOrganizadorDto) => {
    try {
      const res = await fetch(`http://localhost:8888/api/UsuarioOrganizador/unfollow`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto)
      });
      sigueOrganizador.value = !res.ok ? sigueOrganizador.value : false;
    } catch (error) {
      console.error("Error al dejar de seguir al organizador:", error);
    }
  };

  const comprobarSigue = async (dto: UsuarioOrganizadorDto) => {
    try {
      const res = await fetch(`http://localhost:8888/api/UsuarioOrganizador/exists`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto)
      });
      const data = await res.json();
      sigueOrganizador.value = data;
    } catch (error) {
      console.error("Error al comprobar seguimiento:", error);
    }
  };

  const cargarOrganizadoresSeguidos = async (idUsuario: number) => {
    try {
      const res = await fetch(`http://localhost:8888/api/UsuarioOrganizador/seguidos/${idUsuario}`);
      organizadoresSeguidos.value = await res.json();
    } catch (error) {
      console.error("Error al cargar organizadores seguidos:", error);
    }
  };

  const cargarNumSeguidores = async (idOrganizador: number) => {
    try {
      const res = await fetch(`http://localhost:8888/api/UsuarioOrganizador/seguidores/${idOrganizador}`);
      numSeguidores.value = await res.json();
    } catch (error) {
      console.error("Error al cargar número de seguidores:", error);
    }
  };

  const cargarEventosRecientesSeguidos = async (idUsuario: number) => {
    try {
      const res = await fetch(`http://localhost:8888/api/UsuarioOrganizador/eventos-recientes/${idUsuario}`);
      if (res.ok) {
        eventosRecientesSeguidos.value = await res.json();
      }
    } catch (error) {
      console.error("Error al cargar eventos recientes seguidos:", error);
    }
  };

  return {
    organizadoresSeguidos,
    eventosRecientesSeguidos,
    numSeguidores,
    sigueOrganizador,
    followOrganizador,
    unfollowOrganizador,
    comprobarSigue,
    cargarOrganizadoresSeguidos,
    cargarNumSeguidores,
    cargarEventosRecientesSeguidos
  };
});
