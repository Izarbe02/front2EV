<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useEventosStore } from '@/stores/eventos'
import { useEventosGuardadosStore } from '@/stores/eventosGuardados'
import { useUsuariosStore } from '@/stores/usuarios'
import { useComentariosStore } from '@/stores/comentarios'
import EventoInfoDto from '@/stores/dtos/eventoInfo.dto'
import type ComentarioCreateDto from '@/stores/dtos/comentarioCrear.dto'
import type ComentarioUpdateDto from '@/stores/dtos/comentarioUpdate.dto'
import { RouterLink } from 'vue-router'
import Swal from 'sweetalert2'

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
const estaGuardado = ref(false)
const comentarioNuevo = ref('')
const modoEdicion = ref(false)
const comentarioEditandoId = ref<number | null>(null)

const usuario = computed(() => usuariosStore.usuarioLogeado)
const rolActivo = computed(() => usuario.value?.idRol ?? -1)

const loadEvento = async (id: number | null) => {
  if (id !== null) {
    evento.value = await eventosStore.getInfoEvento(id)
    const idUsuario = usuario.value?.id
    if (evento.value && idUsuario) {
      await eventosGuardadosStore.comprobarEventoGuardado(idUsuario, id)
      estaGuardado.value = eventosGuardadosStore.estaGuardado
    }
  }
}

const onToggleGuardar = async () => {
  const idUsuario = usuario.value?.id
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
  if (!usuario.value || props.eventoId === null || rolActivo.value === 2) return

  if (modoEdicion.value && comentarioEditandoId.value !== null) {
    const comentarioData: ComentarioUpdateDto = {
      id: comentarioEditandoId.value,
      idUsuario: usuario.value.id,
      idEvento: props.eventoId,
      contenido: comentarioNuevo.value,
      fecha: new Date().toISOString()
    }
    await comentariosStore.updateComentario(comentarioData)
    Swal.fire('Comentario actualizado', '', 'success')
  } else {
    const comentarioData: ComentarioCreateDto = {
      idUsuario: usuario.value.id,
      idEvento: props.eventoId,
      contenido: comentarioNuevo.value,
      fecha: new Date().toISOString()
    }
    await comentariosStore.createComentario(comentarioData)
    Swal.fire('Comentario creado', '', 'success')
  }

  comentarioNuevo.value = ''
  comentarioEditandoId.value = null
  modoEdicion.value = false
  await comentariosStore.fetchComentariosByEvento(props.eventoId)
}

const borrarComentario = async (idComentario: number) => {
  const result = await Swal.fire({
    title: '¿Eliminar comentario?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#FF5555',
    cancelButtonColor: '#aaa',
    confirmButtonText: 'Sí, borrar',
    cancelButtonText: 'Cancelar'
  })

  if (result.isConfirmed) {
    await comentariosStore.deleteComentario(idComentario)
    if (props.eventoId !== null) {
      await comentariosStore.fetchComentariosByEvento(props.eventoId)
    }

    Swal.fire({
      title: 'Eliminado',
      text: 'El comentario ha sido borrado.',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    })
  }
}

const editarComentario = (comentarioId: number, contenido: string) => {
  comentarioNuevo.value = contenido
  comentarioEditandoId.value = comentarioId
  modoEdicion.value = true
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
  })
}
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
            <span
              v-for="(categoria, index) in evento.categorias"
              :key="index"
              class="evento-detalle__categoria"
            >
              {{ categoria.nombre }}<span v-if="index < evento.categorias.length - 1">, </span>
            </span>
          </div>

          <div class="evento-detalle__tematicas" v-if="evento.tematicas.length">
            <span class="evento-detalle__infoLetra">TEMATICA</span>
            <span
              v-for="(tematica, index) in evento.tematicas"
              :key="index"
              class="evento-detalle__tematica"
            >
              {{ tematica.nombre }}<span v-if="index < evento.tematicas.length - 1">, </span>
            </span>
          </div>

          <div class="evento-detalle__fecha">
            📅 Fecha de inicio : <br />
            {{ new Date(evento.fechaInicio).toLocaleDateString("es-ES", {
              weekday: 'long',
              day: '2-digit',
              month: 'short'
            }) }}
            {{ new Date(evento.fechaInicio).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            }) }}
            <br />
            📅 Fecha de fin : <br />
            {{ new Date(evento.fechaFin).toLocaleDateString("es-ES", {
              weekday: 'long',
              day: '2-digit',
              month: 'short'
            }) }},
            {{ new Date(evento.fechaFin).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            }) }}
          </div>

          <div class="evento-detalle__lugar">
            📍 {{ evento.ubicacion }}
            <RouterLink
              :to="`/OrganizadorDetalle?id=${evento.orgId}`"
              class="evento-detalle__direccion"
            >
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

    <!-- COMENTARIOS -->
    <div class="evento-detalle__comentarios">
      <h3 class="evento-detalle__comentarios-titulo">Comentarios</h3>

      <div
        v-if="comentariosStore.comentarios.length === 0"
        class="evento-detalle__comentarios-vacio"
      >
        No hay comentarios aún.
      </div>

      <div
        v-for="comentario in comentariosStore.comentarios"
        :key="comentario.id"
        class="evento-detalle__comentario"
        style="position: relative;"
      >
        <button
          v-if="rolActivo === 1 || (rolActivo === 3 && comentario.idUsuario === usuario?.id)"
          @click="borrarComentario(comentario.id)"
          class="evento-detalle__comentario-borrar"
          title="Eliminar comentario"
        >
          🗑
        </button>
        <button
          v-if="rolActivo === 1 && comentario.idUsuario === usuario?.id"
          @click="editarComentario(comentario.id, comentario.contenido)"
          class="evento-detalle__comentario-editar"
          title="Editar comentario"
        >
          ✏️
        </button>
        <p class="evento-detalle__comentario-autor">{{ comentario.nombreUsuario }}</p>
        <p class="evento-detalle__comentario-texto">{{ comentario.contenido }}</p>
        <p class="evento-detalle__comentario-fecha">{{ formatFecha(comentario.fecha) }}</p>
      </div>

      <div v-if="usuario && rolActivo !== 2" class="evento-detalle__comentario-formulario">
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
          {{ modoEdicion ? 'Actualizar comentario' : 'Enviar comentario' }}
        </button>
      </div>

      <div v-else-if="rolActivo === 2" class="evento-detalle__comentarios-login">
        <p>🛑 Los organizadores no pueden comentar en eventos.</p>
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

  &__comentarios {
    margin-top: 2rem;
    padding: 2rem;
    background-color: $color-darkgray;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.05);
  }

  &__comentarios-titulo {
    font-family: $first-font;
    font-weight: bold;
    font-size: 1.6rem;
    color: $color-lightred;
    margin-bottom: 1rem;
    text-shadow: 0 0 3px rgba(255, 0, 0, 0.4);
  }

  &__comentarios-vacio {
    font-style: italic;
    color: #f1f1f1;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
  }

  &__comentario {
    background-color: lighten($color-darkgray, 5%);
    border-left: 5px solid $color-lightred;
    border-radius: 0.75rem;
    padding: 1.2rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 0 6px rgba(255, 255, 255, 0.05);
    position: relative;
  }

  &__comentario-autor {
    font-weight: bold;
    color: $color-darkGreen;
    margin-bottom: 0.4rem;
    font-size: 1.1rem;
  }

  &__comentario-texto {
    color: #f1f1f1;
    font-size: 1.05rem;
    margin-bottom: 0.5rem;
  }

  &__comentario-fecha {
    font-size: 0.9rem;
    color: #f1f1f1;
    font-style: italic;
  }

  &__comentario-formulario {
    margin-top: 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__comentario-textarea {
    width: 100%;
    min-height: 100px;
    padding: 0.75rem;
    border-radius: 8px;
    border: 1px solid $color-lightgray;
    background-color: #1b1b1b;
    color: #f1f1f1;
    font-family: $first-font;
    font-size: 1.1rem;
    resize: vertical;

    &:focus {
      outline: none;
      border-color: $color-green;
      box-shadow: 0 0 6px $color-green;
    }
  }

  &__comentario-boton {
    align-self: flex-end;
    background-color: $color-darkGreen;
    color: black;
    border: none;
    padding: 0.6rem 1.6rem;
    font-weight: bold;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: $color-green;
    }

    &:disabled {
      background-color: $color-lightgray;
      color: #333;
      cursor: not-allowed;
    }
  }

  &__comentarios-login {
    margin-top: 1.5rem;
    font-style: italic;
    color: lighten($color-lightgray, 15%);
    font-size: 1rem;
  }

  .evento-detalle__comentario-borrar {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.3rem;
    color: $color-red;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
      color: darken($color-red, 10%);
      transform: scale(1.15);
    }
  }


  .evento-detalle__comentario-borrar {
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  font-size: 1.4rem;
  color: $color-red;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    color: darken($color-red, 10%);
    transform: scale(1.2);
  }
}
.evento-detalle__comentario-editar {
  position: absolute;
  top: 10px;
  right: 45px;
  background: none;
  border: none;
  font-size: 1.2rem;
  color: $color-green;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    color: darken($color-green, 10%);
    transform: scale(1.15);
  }
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
