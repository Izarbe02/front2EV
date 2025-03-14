<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useEstablecimientosStore } from "@/stores/establecimientos";
import type EstablecimientoDto from "@/stores/dtos/establecimiento.dto";

const modalVisible = ref(false);
const esModoEdicion = ref(false);
const store = useEstablecimientosStore();
const { establecimientos, findAll, deleteEstablecimiento, updateEstablecimiento, createEstablecimiento } = store;

onMounted(() => {
  findAll();
});

const nuevoEstablecimiento = (): EstablecimientoDto => ({
  id: 0,
  nombre: '',
  ubicacion: '',
  descripcion: '',
  idOrganizador: 1
});

const establecimientoEditado = ref<EstablecimientoDto>(nuevoEstablecimiento());

const idOrganizadorEditado = computed({
  get: () => establecimientoEditado.value.idOrganizador ?? 1,
  set: (value) => {
    establecimientoEditado.value.idOrganizador = Number(value) || 1;
  }
});

const abrirForm = (establecimiento: EstablecimientoDto) => {
  establecimientoEditado.value = { ...establecimiento };
  esModoEdicion.value = true;
  modalVisible.value = true;
};

const abrirFormularioNuevo = () => {
  establecimientoEditado.value = nuevoEstablecimiento();
  esModoEdicion.value = false;
  modalVisible.value = true;
};

const guardarCambios = async () => {
  if (!establecimientoEditado.value) return;

  establecimientoEditado.value.idOrganizador = Number(establecimientoEditado.value.idOrganizador);
  
  if (esModoEdicion.value) {
    await updateEstablecimiento(establecimientoEditado.value.id, establecimientoEditado.value);
  } else {
    await createEstablecimiento(establecimientoEditado.value);
  }
  
  modalVisible.value = false;
  findAll();
};

const cerrarFormulario = () => {
  modalVisible.value = false;
};

const borrarEstablecimiento = async (id: number) => {
  if (confirm("¿Estás seguro de que quieres eliminar este establecimiento?")) {
    await deleteEstablecimiento(id);
    findAll();
  }
};
</script>

<template>
  <div class="producto-container">
    <h1 class="titulo">ESTABLECIMIENTOS</h1>

    <div class="producto-container__tarjetas">
      <div v-for="establecimiento in establecimientos" :key="establecimiento.id" class="producto-card">
        
        <div class="producto-card__contenido">
          <p class="producto-card__titulo">{{ establecimiento.nombre }}</p>

          <div class="producto-card__info">
            <span class="producto-card__categoria">
              ID Organizador: {{ establecimiento.idOrganizador }}
            </span>
            
            <span class="producto-card__localizacion">
              Ubicación: {{ establecimiento.ubicacion }}
            </span>

            <span class="producto-card__localizacion">
              Descripcion: {{ establecimiento.descripcion }}
            </span>
          </div>
          
          
          <div class="producto-card__acciones">
            <button class="btn-editar" @click="abrirForm(establecimiento)">
              <i class="fas fa-pencil-alt"></i>
            </button>
            <button class="btn-borrar" @click="borrarEstablecimiento(establecimiento.id)">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <button class="btn-nuevo" @click="abrirFormularioNuevo">Agregar Establecimiento</button>

    <div v-if="modalVisible" class="modal">
      <div class="modal-contenido">
        <h2>{{ esModoEdicion ? 'Editar Establecimiento' : 'Nuevo Establecimiento' }}</h2>
        <label>Nombre:</label>
        <input v-model="establecimientoEditado.nombre" type="text" />

        <label>Ubicación:</label>
        <input v-model="establecimientoEditado.ubicacion" type="text" />

        <label>Descripción:</label>
        <textarea v-model="establecimientoEditado.descripcion"></textarea>

        <label>ID Organizador:</label>
        <input v-model="idOrganizadorEditado" type="number" />

        <div class="modal-botones">
          <button @click="guardarCambios">{{ esModoEdicion ? 'Guardar Cambios' : 'Crear' }}</button>
          <button @click="cerrarFormulario">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";
@import "@/assets/styles/_mixins.scss";

.producto-container {
  padding: 2%;
  text-align: center;

  &__tarjetas {
    margin-top: 25px;
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr;
    justify-items: center;
    margin-bottom: 30px;
  }
}

h1 {
  @include titulo-evento;
  text-align: center;
  text-shadow: 0px 0px 10px $color-black, 0px 0px 20px $color-black;
  margin-top: 2%;
}

.btn-nuevo {
  background-color: #272525;
  border-radius: 8px;
  border: 2px solid #868686;
  color: $color-lightred;
  padding: 1%;
  display: block;
  margin: 20px auto; 
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: $color-gray;
    color: white;
  }
}

.producto-card {
  background-color: #272525;
  border: 2px solid #292929;
  border-radius: 8px;
  color: #fff;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  width: 100%;
  max-width: 370px;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 0px 15px rgba(92, 92, 92, 0.7);
  }

  &__contenido {
    padding: 12px;
  }

  &__titulo {
    font-family: $titulo;
    font-size: 30px;
    text-align: center;
    margin-bottom: 30px;
    color: #fff9f9;
    text-shadow: 2px 2px 5px rgba(255, 5, 5, 0.7);
    padding: 10px;
    font-weight: 500;
  }

  &__info {
    font-family: $first-font;
    font-size: 1.2rem;
    color: #bbb;
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 10px;
  }

  &__acciones {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
  }

  &__boton {
    @include boton-rojo;
  }

  .btn-editar, .btn-borrar {
    padding: 8px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }

  .btn-editar {
    background-color: #007bff;
    color: white;
  }

  .btn-borrar {
    background-color: #d40202;
    color: white;
  }
}

.modal {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  .modal-contenido {
    background: #fff;
    padding: 25px;
    border-radius: 8px;
    width: 450px;
    text-align: center;

    h2 {
      font-size: 22px;
      color: $color-darkgray;
      margin-bottom: 15px;
    }

    label {
      display: block;
      font-weight: bold;
      margin-top: 10px;
      color: $color-black;
    }

    input, textarea {
      width: 100%;
      padding: 10px;
      border: 1px solid $color-lightgray;
      border-radius: 8px;
      font-size: 16px;
      margin-top: 5px;
    }
  }

  .modal-botones {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }

  button {
    padding: 10px 15px;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:first-child {
    background-color: #12a0aa;
    color: white;
  }

  button:last-child {
    background-color:  rgb(201, 16, 47);
    color: rgb(240, 239, 239);
  }

  button:hover {
    opacity: 0.8;
  }
}

@media (min-width: 768px) {
  .producto-container__tarjetas {
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    margin-bottom: 50px;
  }

  .producto-card {
    background: url("@/assets/Images/fondo1.jpg") no-repeat center center;
    background-size: cover;
    border: 2px solid $color-gray;
    border-radius: 8px;
    color: #fff;
    width: 100%;
    max-width: 430px;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  }
}
</style>

