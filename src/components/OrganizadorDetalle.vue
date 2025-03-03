<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useOrganizadoresStore } from "@/stores/organizadores";
import type OrganizadorDto from "@/stores/dtos/organizador.dto";

const route = useRoute();
const props = defineProps({
  organizadorId: {
    type: Number,
    default: null
  }
});

const organizadorStore = useOrganizadoresStore();
const organizador = ref<OrganizadorDto | null>(null);

// Función para cargar el organizador
const loadOrganizador = async (id: number | null) => {
  if (id !== null) {
    organizador.value = await organizadorStore.getOrganizador(id);
    console.log("Organizador cargado:", organizador.value);
  }
};

onMounted(() => {
  loadOrganizador(props.organizadorId);
});

watch(() => props.organizadorId, (newId) => {
  loadOrganizador(newId);
});
</script>

<template>
   <div class="organizador-detalle" v-if="organizador">
        <div class="organizador-detalle__contenedor">
            
                <h1 class="organizador-detalle__titulo">{{ organizador.nombre }}</h1>
                <div class="organizador-detalle__contenido">
                    <img :src="organizador.enlace" :alt="organizador.nombre" class="organizador-detalle__portada" />
                    <div class="organizador-detalle__info">
                        
                        <div class="organizador-detalle__lugar">
                            📍 
                            <span class="organizador-detalle__direccion">{{ organizador.ubicacion }}</span>
                        </div>

                        <div class="organizador-detalle__descripcion">
                            <p class="organizador-detalle__subtitulo">Descripción del organizador</p>
                            <p class="organizador-detalle__descripcion">
                                {{ organizador.descripcion }}
                            </p>
                        </div>
                    </div>
                </div>
        </div>
    </div>
    
</template>

<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";
@import "@/assets/styles/_mixins.scss";

.organizador-detalle {
    background: url("@/assets/images/fondo1.jpg") no-repeat center center;
  background-size: cover;
    color: #fff;
    margin: 5% auto;
    margin-top: 90px;
    padding: 3%;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);

    &__titulo {
        font-family:$titulo;
        font-size: 1.7rem;
        font-weight: bold;
        margin-bottom: 10px;
    }

    &__contenedor {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__contenido{
        display: flex;
        flex-direction: row;
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
    &__infoLetra{
        font-weight: bold;
        color: $color-lightred;
        font-family:$first-font ;
    }
    &__direccion {
        font-family:$first-font ;
        font-size: 1.1rem;
        color: #bbb;
    }
    &__boton {
        font-family:$first-font ;
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
        font-family:$titulo ;
        font-size: 1.5rem;
        color: $color-lightred;
        font-weight: bold;
        text-align: left;
        margin-top: 20px;
    }

    &__descripcion {
        font-family:$first-font ;
        font-size: 1.2rem;
        color: #ddd;
        text-align: left;
        margin-top: 10px;
    }
}


@media (min-width: 900px) {
    .evento-detalle {
        max-width: 70%;

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


        &__contenido{
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            width: 50%;
        }

        &__portada {
            flex: 1;
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
