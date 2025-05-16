<template>
    <div class="crear-evento">
      <h2 class="crear-evento__titulo">Crear nuevo evento</h2>
      <form @submit.prevent="enviarFormulario" class="crear-evento__form">
        <div class="crear-evento__grupo">
          <label class="crear-evento__label" for="nombre">Nombre</label>
          <input v-model="form.nombre" id="nombre" required class="crear-evento__input" />
        </div>
  
        <div class="crear-evento__grupo">
          <label class="crear-evento__label" for="descripcion">Descripción</label>
          <textarea v-model="form.descripcion" id="descripcion" required class="crear-evento__input"></textarea>
        </div>
  
        <div class="crear-evento__grupo">
          <label class="crear-evento__label" for="ubicacion">Ubicación</label>
          <input v-model="form.ubicacion" id="ubicacion" required class="crear-evento__input" />
        </div>
  
        <div class="crear-evento__grupo">
          <label class="crear-evento__label" for="fechaInicio">Fecha Inicio</label>
          <input type="date" v-model="form.fechaInicio" id="fechaInicio" required class="crear-evento__input" />
        </div>
  
        <div class="crear-evento__grupo">
          <label class="crear-evento__label" for="fechaFin">Fecha Fin</label>
          <input type="date" v-model="form.fechaFin" id="fechaFin" required class="crear-evento__input" />
        </div>
  
        <div class="crear-evento__grupo">
          <label class="crear-evento__label" for="enlace">Enlace</label>
          <input v-model="form.enlace" id="enlace" class="crear-evento__input" />
        </div>
  
        <div class="crear-evento__grupo">
          <label class="crear-evento__label" for="idTematica">ID Temática</label>
          <input type="number" v-model.number="form.idTematica" id="idTematica" class="crear-evento__input" />
        </div>
  
        <div class="crear-evento__grupo">
          <label class="crear-evento__label" for="idCategoria">ID Categoría</label>
          <input type="number" v-model.number="form.idCategoria" id="idCategoria" class="crear-evento__input" />
        </div>
  
        <button type="submit" class="crear-evento__boton">Crear Evento</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import EventoDto from "@/stores/dtos/evento.dto";
  import { useOrganizadoresStore } from "@/stores/organizadores";
  import { useEventosStore } from "@/stores/eventos";
  
  const { createEvento } = useEventosStore();
  const { organizadorLogeado } = useOrganizadoresStore();
  
  const form = ref({
    nombre: "",
    descripcion: "",
    ubicacion: "",
    fechaInicio: "",
    fechaFin: "",
    enlace: "",
    idTematica: null,
    idCategoria: null,
  });
  
  async function enviarFormulario() {
    if (!organizadorLogeado?.id) {
      alert("Debes iniciar sesión como organizador para crear un evento.");
      return;
    }
  
    const nuevoEvento = new EventoDto(
      0,
      form.value.nombre,
      form.value.descripcion,
      form.value.ubicacion,
      new Date(form.value.fechaInicio),
      new Date(form.value.fechaFin),
      form.value.idTematica,
      form.value.enlace,
      form.value.idCategoria,
      organizadorLogeado.id
    );
  
    await createEvento(nuevoEvento);
    alert("Evento creado correctamente");
  
    // Limpiar formulario
    form.value = {
      nombre: "",
      descripcion: "",
      ubicacion: "",
      fechaInicio: "",
      fechaFin: "",
      enlace: "",
      idTematica: null,
      idCategoria: null,
    };
  }
  </script>
  
  <style scoped lang="scss">
  @import "@/assets/styles/_variables.scss";
  
  .crear-evento {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding: 1rem;
  
    &__titulo {
      text-align: center;
      color: $color-red;
      font-size: 1.6rem;
      font-weight: bold;
      margin-bottom: 1.5rem;
    }
  
    &__form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  
    &__grupo {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }
  
    &__label {
      font-weight: bold;
      color: $color-lightgray;
      font-size: 0.95rem;
    }
  
    &__input {
      padding: 0.5rem;
      border-radius: 6px;
      border: 1px solid $color-lightgray;
      font-family: $first-font;
      background-color: white;
      color: $color-black;
      font-size: 1rem;
    }
  
    &__input:focus {
      outline: 2px solid $color-red;
    }
  
    &__boton {
      background-color: $color-red;
      color: white;
      padding: 0.75rem 1rem;
      font-weight: bold;
      font-family: $first-font;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
  
      &:hover {
        background-color: $color-lightred;
      }
    }
  }
  
  @media (min-width: 768px) {
    .crear-evento {
      padding: 2rem;
  
      &__titulo {
        font-size: 2rem;
      }
  
      &__label {
        font-size: 1rem;
      }
  
      &__input {
        font-size: 1.05rem;
      }
    }
  }
  </style>
  