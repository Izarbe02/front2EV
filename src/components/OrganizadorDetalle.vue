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
                    <div class="organizador-detalle__imagen">
                        <img :src="organizador.enlace" :alt="organizador.nombre" class="organizador-detalle__portada" />
                    </div>
                    <div class="organizador-detalle__info">
                            <p class="organizador-detalle__subtitulo">Información</p>
                            <p class="organizador-detalle__descripcion">
                                {{ organizador.descripcion }}
                            </p>
                            <p class="organizador-detalle__direccion">📍{{ organizador.ubicacion }}</p>
                            <p class="organizador-detalle__descripcion">{{ organizador.email }}</p>
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
    display: flex;
    flex-direction: column;

    &__titulo {
        font-family:$titulo;
        font-size: 1.9rem;
        font-weight: bold;
        margin-bottom: 10px;
    }

    &__contenedor {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__portada {
    width: 370px;
    height: 340px; 
    object-fit: cover; 
    border-radius: 10px;
    margin-bottom: 20px;
    }

    &__contenido{
        display: flex;
        flex-direction: column;
    }

    &__info {
        font-size: 1.4rem;
        display: flex;
        flex-direction: column;
        gap: 10px;
        border: 2px solid #272525;
        border-radius: 8px;
        padding: 3%;
        text-align: left;
    }

    &__infoLetra{
        font-weight: bold;
        color: $color-lightred;
        font-family:$first-font;
    }

    &__direccion {
        font-family:$first-font ;
        font-size: 1.4rem;
        color: #bbb;
    }

    &__subtitulo {
        font-family:$titulo ;
        font-size: 1.6rem;
        color: $color-lightred;
        font-weight: bold;
        text-align: left;
    }

    &__descripcion {
        font-family:$first-font ;
        color: #ddd;
        text-align: left;
    }
}


@media (min-width: 900px) {
    .organizador-detalle {
        max-width: 80%;

        &__titulo {
        font-size: 2rem;
        margin-bottom: 3%;
        }

        &__contenedor {
            justify-content: space-between;
            align-items: center;
        }


        &__contenido{
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            gap: 10%;
        }

        &__portada {
            width: 450px;
            height: 400px; 
            object-fit: cover; 
            border-radius: 10px;
        }
        &__subtitulo{
            font-size: 1.8rem;
        }
        &__info {
            font-size: 1.6rem;
            width: 450px;
            height: 300px;
            display: flex;
            justify-content: space-between;
        }
        &__direccion{
            font-size: 1.6rem;
        }

        &__boton {
            padding: 10px 25px;
            font-size: 1rem;
        }
    }
}
</style>
