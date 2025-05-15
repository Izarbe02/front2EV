<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useEventosStore } from '@/stores/eventos'
import { useEventosGuardadosStore } from '@/stores/eventosGuardados'
import { useUsuariosStore } from '@/stores/usuarios'
import { useComentariosStore } from '@/stores/comentarios'
import EventoInfoDto from '@/stores/dtos/eventoInfo.dto'
import type ComentarioCreateDto from '@/stores/dtos/comentarioCrear.dto'
import { RouterLink } from 'vue-router';


const eventosStore = useEventosStore()
const eventosGuardadosStore = useEventosGuardadosStore()
const usuariosStore = useUsuariosStore()
const comentariosStore = useComentariosStore()

const props = defineProps({
  eventoId: {
    type: Number,
    default: null
  }
})

const evento = ref<EventoInfoDto | null>(null)
const estaGuardado = ref<boolean>(false)
const comentarioNuevo = ref<string>("")

const loadEvento = async (id: number | null) => {
  if (id !== null) {
    evento.value = await eventosStore.getInfoEvento(id)
    const idUsuario = usuariosStore.usuarioLogeado?.id
    if (evento.value && idUsuario) {
      await eventosGuardadosStore.comprobarEventoGuardado(idUsuario, id)
      estaGuardado.value = eventosGuardadosStore.estaGuardado
    }
  }
}

const onToggleGuardar = async () => {
  const idUsuario = usuariosStore.usuarioLogeado?.id
  if (!evento.value || !idUsuario) return
  const idEvento = props.eventoId

  if (estaGuardado.value) {
    await eventosGuardadosStore.quitarEvento(idUsuario, idEvento)
  } else {
    await eventosGuardadosStore.guardarEvento(idUsuario, idEvento)
  }

  await eventosGuardadosStore.comprobarEventoGuardado(idUsuario, idEvento)
  estaGuardado.value = eventosGuardadosStore.estaGuardado
}

const enviarComentario = async () => {
  if (!usuariosStore.usuarioLogeado || props.eventoId === null) return;

  const nuevoComentario: ComentarioCreateDto = {
    idUsuario: usuariosStore.usuarioLogeado.id,
    idEvento: props.eventoId,
    contenido: comentarioNuevo.value,
    fecha: new Date().toISOString()
  }

  await comentariosStore.createComentario(nuevoComentario);
  comentarioNuevo.value = "";
  await comentariosStore.fetchComentariosByEvento(props.eventoId); 
}

onMounted(() => {
  loadEvento(props.eventoId)
  if (props.eventoId !== null) {
    comentariosStore.fetchComentariosByEvento(props.eventoId)
  }
})


watch(() => props.eventoId, async (newId) => {
  await loadEvento(newId)
  if (newId !== null) {
    await comentariosStore.fetchComentariosByEvento(newId)
  }
})

function formatFecha(fecha: string): string {
  return new Date(fecha).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

console.log(evento);
</script>

<template>
  <div class="evento-detalle" v-if="evento">
    <div class="evento-detalle__contenedor">
      <img :src="evento.enlace" :alt="evento.nombreEvento" class="evento-detalle__portada" />

      <div class="evento-detalle__contenido">
        <h1 class="evento-detalle__titulo">{{ evento.nombreEvento }}</h1>

        <div class="evento-detalle__info">
          <div class="evento-detalle__categorias" v-if="evento.categorias.length">
            <span class="evento-detalle__infoLetra">CATEGORIA</span>
            <span v-for="(categoria, index) in evento.categorias" :key="index" class="evento-detalle__categoria">
              {{ categoria.nombre }}<span v-if="index < evento.categorias.length - 1">, </span>
            </span>
          </div>

          <div class="evento-detalle__tematicas" v-if="evento.tematicas.length">
            <span class="evento-detalle__infoLetra">TEMATICA</span>
            <span v-for="(tematica, index) in evento.tematicas" :key="index" class="evento-detalle__tematica">
              {{ tematica.nombre }}<span v-if="index < evento.tematicas.length - 1">, </span>
            </span>
          </div>

          <div class="evento-detalle__fecha">
            📅 Fecha de inicio : <br>{{ new Date(evento.fechaInicio).toLocaleDateString("es-ES", { weekday: 'long', day: '2-digit', month: 'short' }) }}
            {{ new Date(evento.fechaInicio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }} <br>
            📅 Fecha de fin : <br>{{ new Date(evento.fechaFin).toLocaleDateString("es-ES", { weekday: 'long', day: '2-digit', month: 'short' }) }},
            {{ new Date(evento.fechaFin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
          </div>

          <div class="evento-detalle__lugar">
            📍 {{ evento.ubicacion }}
            <RouterLink :to="`/OrganizadorDetalle?id=${evento.orgId}`" class="evento-detalle__direccion">
  {{ evento.nombreOrg }}
</RouterLink>



          </div>

          <div class="evento-detalle__acciones">
            <button class="evento-detalle__boton">📅 Añadir al calendario</button>
            <button class="evento-detalle__boton">⬇️ Descargar folleto</button>
            <button class="evento-detalle__boton" @click="onToggleGuardar">
              {{ estaGuardado ? '💔 Quitar de guardados' : '❤️ Guardar evento' }}
            </button>
          </div>

          <div class="evento-detalle__descripcion">
            <p class="evento-detalle__subtitulo">Descripción del evento</p>
            <p class="evento-detalle__descripcion">
              {{ evento.descripcion }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Comentarios -->
    <div class="evento-detalle__comentarios">
      <h3 class="evento-detalle__comentarios-titulo">Comentarios</h3>

      <div v-if="comentariosStore.comentarios.length === 0" class="evento-detalle__comentarios-vacio">
        No hay comentarios aún.
      </div>

      <div
        v-for="comentario in comentariosStore.comentarios"
        :key="comentario.id"
        class="evento-detalle__comentario"
      >
        <p class="evento-detalle__comentario-autor">{{ comentario.nombreUsuario }}</p>
        <p class="evento-detalle__comentario-texto">{{ comentario.contenido }}</p>
        <p class="evento-detalle__comentario-fecha">{{ formatFecha(comentario.fecha) }}</p>
      </div>

      <div v-if="usuariosStore.usuarioLogeado" class="evento-detalle__comentario-formulario">
        <textarea
          v-model="comentarioNuevo"
          placeholder="¿Qué opinas sobre este evento?"
          class="evento-detalle__comentario-textarea"
        ></textarea>
        <button
          class="evento-detalle__comentario-boton"
          :disabled="comentarioNuevo.trim().length === 0"
          @click="enviarComentario"
        >
          Enviar comentario
        </button>
      </div>

      <div v-else class="evento-detalle__comentarios-login">
        <p>🔒 Inicia sesión para dejar un comentario.</p>
      </div>
    </div>
  </div>

  <div v-else>
    <p>Cargando evento...</p>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";
@import "@/assets/styles/_mixins.scss";

.evento-detalle {
  color: #fff;
  margin: 5% auto;
  margin-top: 150px;
  padding: 3%;
  text-align: center;
  border-radius: 10px;

  &__titulo {
    font-family: $titulo;
    font-size: 1.7rem;
    font-weight: bold;
    margin-bottom: 10px;
  }

  &__contenedor {
    background: url("@/assets/Images/fondo1.jpg") no-repeat center center;
    background-size: cover;
    padding: 10%;
    border: 1px solid #fc0000;
    display: flex;
    border-radius: 10px;
    flex-direction: column;
    align-items: center;
  }
  &__direccion {
    color: $color-lightred;
    font-weight: bold;
    cursor: pointer;
    text-decoration: underline;

    &:hover {
      text-shadow: 0px 0px 6px rgba(255, 0, 0, 0.6);
    }
  }

  &__portada {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 5%;
    box-shadow: 0px 0px 15px rgba(248, 14, 14, 0.7);
  }

  &__info {
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    border: 2px solid #272525;
    border-radius: 8px;
    padding: 3%;
  }

  &__infoLetra {
    font-weight: bold;
    color: $color-lightred;
    font-family: $first-font;
  }

  &__fecha,
  &__lugar {
    font-family: $first-font;
    font-weight: bold;
  }

  &__direccion {
    font-family: $first-font;
    font-size: 1.1rem;
    color: #bbb;
  }

  &__acciones {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
  }

  &__boton {
    font-family: $first-font;
    background-color: #272525;
    color: #d40202;
    border: 2px solid #d40202;
    padding: 10px 50px;
    font-size: 1.2rem;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s;

    &:hover {
      background-color: #d40202;
      color: #000;
      box-shadow: 0px 0px 10px #d40202;
    }
  }

  &__subtitulo {
    font-family: $titulo;
    font-size: 1.5rem;
    color: $color-lightred;
    font-weight: bold;
    text-align: left;
    margin-top: 20px;
  }

  &__descripcion {
    font-family: $first-font;
    font-size: 1.2rem;
    color: #ddd;
    text-align: left;
    margin-top: 10px;
  }

  // SOLO ESTILOS DE COMENTARIOS:
  &__comentarios {
    margin-top: 2rem;
    text-align: left;
    padding: 1rem;
  }

  &__comentarios-titulo {
    font-family: $first-font;
    font-weight: bold;
    font-size: 1.3rem;
    color: $color-darkgray;
    margin-bottom: 1rem;
  }

  &__comentarios-vacio {
    font-style: italic;
    color: $color-lightgray;
    margin-bottom: 1rem;
  }

  &__comentario {
    background-color: $color-whitered;
    border-radius: 0.75rem;
    padding: 1rem;
    margin-bottom: 1rem;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  }

  &__comentario-autor {
    font-weight: bold;
    color: $color-darkGreen;
    margin-bottom: 0.3rem;
  }

  &__comentario-texto {
    margin: 0.5rem 0;
    color: $color-darkgray;
  }

  &__comentario-fecha {
    font-size: 0.85rem;
    color: $color-lightgray;
  }

  &__comentario-formulario {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__comentario-textarea {
    width: 100%;
    min-height: 80px;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid $color-lightgray;
    font-family: $first-font;
    font-size: 1rem;
  }

  &__comentario-boton {
    align-self: flex-end;
    background-color: $color-darkGreen;
    color: $color-black;
    border: none;
    padding: 0.5rem 1.5rem;
    font-weight: bold;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: $color-green;
    }

    &:disabled {
      background-color: $color-lightgray;
      cursor: not-allowed;
    }
  }

  &__comentarios-login {
    margin-top: 1rem;
    font-style: italic;
    color: $color-lightgray;
  }


}

@media (min-width: 900px) {
  .evento-detalle {
    max-width: 80%;

    &__titulo {
      font-size: 1.9rem;
      margin-bottom: 3%;
    }

    &__contenedor {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 5%;
    }

    &__contenido {
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      width: 50%;
    }

    &__portada {
      flex: 1;
      max-width: 480px;
      height: 80%;
    }

    &__info {
      flex: 1;
      text-align: left;
    }

    &__acciones {
      flex-direction: column;
    }

    &__boton {
      padding: 10px 25px;
      font-size: 1rem;
    }
  }
}
</style>
