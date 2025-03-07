<script setup lang="ts">import { ref, onMounted, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
import { useOrganizadoresStore } from "@/stores/organizadores";
import type OrganizadorDto from "@/stores/dtos/organizador.dto";
import { useEventosStore } from "@/stores/eventos";
import type EventoDto from "@/stores/dtos/evento.dto"; 

const props = defineProps({
  organizadorId: {
    type: Number,
    default: null
  }
});


const organizadorStore = useOrganizadoresStore();
const eventosStore = useEventosStore();
const { getEventoPorIdORganizador } = eventosStore;


const organizador = ref<OrganizadorDto | null>(null);
const eventosLocales = ref<EventoDto[]>([]); 
const isLoading = ref(false);
const isMounted = ref(false);


const loadOrganizador = async (id: number | null) => {
  if (!id) return;
  organizador.value = (await organizadorStore.getOrganizador(id)) ?? null;
};

const loadEventos = async (id: number | null) => {
  if (!id) return;
  
  eventosLocales.value = []; 
  isLoading.value = true;
  await nextTick(); 

  
  const nuevosEventos = await getEventoPorIdORganizador(id);
  if (!Array.isArray(nuevosEventos)) {
    eventosLocales.value = [];
  } else {
    eventosLocales.value = [...nuevosEventos];
  }
  
  isLoading.value = false;
  console.log("Eventos cargados correctamente:", eventosLocales.value);
};

onMounted(async () => {
  if (props.organizadorId !== null) {
    await loadOrganizador(props.organizadorId);
    await loadEventos(props.organizadorId);
  }
  isMounted.value = true;
});

watch(
  () => props.organizadorId,
  async (newId, oldId) => {
    if (!isMounted.value || newId === oldId || newId === null) return;
    
    isLoading.value = true;

    eventosLocales.value = [];
    await nextTick();

    await loadOrganizador(newId);
    await loadEventos(newId);

    isLoading.value = false;
  }
);

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
                    <p class="organizador-detalle__descripcion">{{ organizador.descripcion }}</p>
                    <p class="organizador-detalle__direccion">📍{{ organizador.ubicacion }}</p>
                    <p class="organizador-detalle__descripcion">{{ organizador.email }}</p>
                </div>
            </div>

            <div class="organizador-detalle__eventos">
                <p class="organizador-detalle__tituloseventos">Nuestros eventos</p>
                <div v-if="isLoading">
                    <p> Cargando eventos...</p>
                </div>
                
                <div v-else-if="eventosLocales.length > 0" class="organizador-detalle__contenedoreventos">
                    <div v-for="evento in eventosLocales" :key="evento.id" class="evento-card">
                        <img :src="evento.enlace" :alt="evento.nombre" class="evento-card__imagen" />
                        <div class="evento-card__contenido">
                            <p class="evento-card__titulo">{{ evento.nombre }}</p>
                            <div class="evento-card__info">
                                <span class="evento-card__fecha">
                                    {{ new Date(evento.fecha_inicio).toLocaleDateString("es-ES", { weekday: 'long', day: '2-digit', month: 'short' }) }},
                                </span>
                                <span class="evento-card__localizacion">{{ evento.ubicacion }}</span>
                            </div>
                            <button class="evento-card__boton">
                                <RouterLink :to="`/EventoDetalle?id=${evento.id}`" class="evento-card__link">
                                    Saber más
                                </RouterLink>
                            </button>
                        </div>
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
   
    color: #fff;
    margin: 5% auto;
    margin-top: 90px;
    padding: 2%;
    text-align: center;
    border-radius: 10px;
   
    display: flex;
    flex-direction: column;
    max-width: 100vw;

    &__titulo {
        font-family:$titulo;
        font-size: 2.1rem;
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
        box-shadow: 0px 0px 15px rgba(248, 14, 14, 0.7);
       
    }

    &__contenido{
        display: flex;
        flex-direction: column;
        background: url("@/assets/Images/fondo1.jpg") no-repeat center center;
    background-size: cover;
    border: 2px solid #fc0000;
    border-radius: 10px;
    padding: 5%;
        
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
        font-size: 1.7rem;
        color: $color-lightred;
        font-weight: bold;
        text-align: left;
    }

    &__descripcion {
        font-family:$first-font ;
        color: #ddd;
        text-align: left;
    }
    &__eventos{
        margin-top: 5%;
        display: flex;
        flex-direction: column;
        justify-content: left;
        overflow: hidden;
        max-width: 100%;
    }
    &__tituloseventos{
        font-family:$titulo ;
        font-size: 1.8rem;
        color: white;
        font-weight: bold;
        text-align: left;
        margin-bottom: 1%;
    }
    &__contenedoreventos {
        display: flex;
        flex-wrap: nowrap;
        gap: 25px;
        overflow-x: auto;
        padding: 20px;
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
        border-radius: 10px;
        max-width: 100%;
        white-space: nowrap;
        scrollbar-width: thin;
        scrollbar-color: rgba(172, 33, 33, 0.3) transparent;
        background: url("@/assets/Images/fondo1.jpg") no-repeat center center;
    background-size: cover;
    border: 2px solid #131313;
    border-radius: 10px;


        &::-webkit-scrollbar {
            height: 8px;
        }

        &::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 4px;
        }
    }
.evento-card {
  background-color: #272525;
  border: 2px solid #292929;
  border-radius: 8px;
  color: #fff;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  width: 300px;
  flex-shrink: 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 0px 15px rgba(92, 92, 92, 0.7);
  }

  &__imagen {
    height: 200px;
    object-fit: cover;
    
  }

  &__contenido {
    padding: 2%;
  }

  &__titulo {
    font-family: $titulo;
    margin-top: 1%;
    font-size: 23px;
    text-align: center;
    color: #fff9f9;
    text-shadow: 2px 2px 5px rgba(255, 5, 5, 0.7);
    width: 100%;
    padding: 10px;
    word-break: keep-all;   
    overflow-wrap: break-word;
    white-space: normal;  
  }

  &__info {
    font-family: $first-font;
    font-size: 1.2rem;
    color: #bbb;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__boton {
    font-family: $titulo;
    padding: 8px;
    border-radius: 5px;
    @include boton-rojo;
    
  }
  &__link{
    text-decoration: none;
    color: $color-lightred;
  }
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
