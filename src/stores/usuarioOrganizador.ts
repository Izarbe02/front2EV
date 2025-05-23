import { defineStore } from 'pinia';
import { ref } from 'vue';
import type UsuarioOrganizadorDto from "@/stores/dtos/UsuarioOrganizador.dto";
import type  OrganizadorDto  from '@/stores/dtos/organizador.dto';

export const useUsuariosOrganizadoresStore = defineStore('usuariosOrganizadores', () => {
  const organizadoresSeguidos = ref<OrganizadorDto[]>([]);
  const numSeguidores = ref<number>(0);
  const sigueOrganizador = ref<boolean>(false);

  const followOrganizador = async (dto: UsuarioOrganizadorDto) => {
    const res = await fetch(`http://localhost:4444/api/UsuarioOrganizador/follow?idUsuario=${dto.idUsuario}&idOrganizador=${dto.idOrganizador}`, {
      method: 'POST'
    });
    if (res.ok) {
      sigueOrganizador.value = true;
    }
  };

  const unfollowOrganizador = async (dto: UsuarioOrganizadorDto) => {
    const res = await fetch(`http://localhost:4444/api/UsuarioOrganizador/unfollow?idUsuario=${dto.idUsuario}&idOrganizador=${dto.idOrganizador}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      sigueOrganizador.value = false;
    }
  };

  const comprobarSigue = async (dto: UsuarioOrganizadorDto) => {
    const res = await fetch(`http://localhost:4444/api/UsuarioOrganizador/exists?idUsuario=${dto.idUsuario}&idOrganizador=${dto.idOrganizador}`);
    const data = await res.json();
    sigueOrganizador.value = data;
  };

  const cargarOrganizadoresSeguidos = async (idUsuario: number) => {
    const res = await fetch(`http://localhost:4444/api/UsuarioOrganizador/seguidos/${idUsuario}`);
    organizadoresSeguidos.value = await res.json();
  };

  const cargarNumSeguidores = async (idOrganizador: number) => {
    const res = await fetch(`http://localhost:4444/api/UsuarioOrganizador/seguidores/${idOrganizador}`);
    numSeguidores.value = await res.json();
  };

  return {
    organizadoresSeguidos,
    numSeguidores,
    sigueOrganizador,
    followOrganizador,
    unfollowOrganizador,
    comprobarSigue,
    cargarOrganizadoresSeguidos,
    cargarNumSeguidores
  };
});
