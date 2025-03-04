<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
import { useOrganizadoresStore } from "@/stores/organizadores";
import type OrganizadorDto from "@/stores/dtos/organizador.dto";
import { useEventosStore } from "@/stores/eventos";

const props = defineProps({
  organizadorId: {
    type: Number,
    default: null
  }
});

// Stores
const organizadorStore = useOrganizadoresStore();
const eventosStore = useEventosStore();
const { getEventoPorIdORganizador } = eventosStore;

// Datos reactivos
const organizador = ref<OrganizadorDto | null>(null);
const eventosLocales = ref([]);  
const isLoading = ref(false);
const isMounted = ref(false);


const loadOrganizador = async (id: number | null) => {
  if (!id) return;
  console.log(`📡 Cargando organizador ${id}...`);
  organizador.value = await organizadorStore.getOrganizador(id);
};



const loadEventos = async (id: number | null) => {
  if (!id) return;
  console.log("🔄 Eliminando eventos anteriores...");
  
  eventosLocales.value = []; // 🔥 Forzamos a Vue a detectar el cambio
  isLoading.value = true;
  await nextTick(); // 🔄 Esperar a que Vue borra la lista antes de cargar la nueva

  console.log(`📡 Cargando eventos del organizador ${id}...`);
  
  const nuevosEventos = await getEventoPorIdORganizador(id);
  if (!Array.isArray(nuevosEventos)) {
    console.error("❌ Error: `nuevosEventos` no es un array. Se recibió:", nuevosEventos);
    eventosLocales.value = []; // 🔥 Evitar que Vue intente iterar un `undefined`
  } else {
    eventosLocales.value = [...nuevosEventos]; // 🔥 Ahora sí es seguro hacer spread
  }
  
  isLoading.value = false;
  console.log("✅ Eventos cargados correctamente:", eventosLocales.value);
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
    
    console.log(`🔄 Cambio de organizador detectado: ${newId}`);
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
                <div v-if="isLoading">
                    <p>⏳ Cargando eventos...</p>
                </div>
                
                <div v-else-if="eventosLocales.length > 0">
                    <div v-for="evento in eventosLocales" :key="evento.id" class="evento-card">
                        <img :src="evento.enlace" :alt="evento.nombre" class="evento-card__imagen" />
                        <div class="evento-card__contenido">
                            <p class="evento-card__titulo">{{ evento.nombre }}</p>
                            <div class="evento-card__info">
                                <span class="evento-card__fecha">
                                    {{ new Date(evento.fecha_inicio).toLocaleDateString("es-ES", { weekday: "long", day: "2-digit", month: "short" }) }},
                                    {{ new Date(evento.fecha_inicio).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }}
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
    
.evento-card {
  background-color: #272525;
  border: 2px solid #292929;
  border-radius: 8px;
  color: #fff;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 0px 15px rgba(92, 92, 92, 0.7);
  }

  &__imagen {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  &__contenido {
    padding: 12px;
  }

  &__titulo {
    font-family: $titulo;
    margin-top: 5%;
    font-size: 30px;
    text-align: center;
    margin-bottom: 30px;
    color: #fff9f9;
    text-shadow: 2px 2px 5px rgba(255, 5, 5, 0.7);
    width: 100%;
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

  &__boton {
    font-family: $titulo;
    padding: 8px;
    border-radius: 5px;
    @include boton-rojo;
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
