<script setup lang="ts">
    import { ref, onMounted, watch } from 'vue'
    import { useEventosStore } from '@/stores/eventos'
    import { EventoInfoDto } from '@/stores/dtos/eventoInfo.dto'
    import { useRoute } from 'vue-router'
    const eventosStore = useEventosStore()

    
     const props = defineProps({
        eventoId: {
        type: Number,
        default: null
        }
    });

const eventoStore = useEventosStore();
const evento = ref<EventoInfoDto | null>(null);

// Función para cargar el organizador
const loadEvento = async (id: number | null) => {
  if (id !== null) {
    evento.value = await eventoStore.getInfoEvento(id);
    console.log("Evento cargado:", evento.value);
  }
};

onMounted(() => {
  loadEvento(props.eventoId);
});

watch(() => props.eventoId, (newId) => {
  loadEvento(newId);
});
   


</script>

<template>
     <div class="evento-detalle" v-if="evento">
        <div class="evento-detalle__contenedor">
            <img :src="evento.enlace" :alt="evento.nombreEvento" class="evento-detalle__portada" />

            <div class="evento-detalle__contenido">
                <h1 class="evento-detalle__titulo">{{ evento.nombreEvento }}</h1>

                <div class="evento-detalle__info">
                    <div class="evento-detalle__categorias" v-if="evento.categorias.length">
                        <span class="evento-detalle__infoLetra">CATEGORIA     </span>
                        <span v-for="(categoria, index) in evento.categorias" :key="index" class="evento-detalle__categoria">
                            {{ categoria.nombre }}<span v-if="index < evento.categorias.length - 1">, </span>
                        </span>
                    </div>

                    <div class="evento-detalle__tematicas" v-if="evento.tematicas.length">
                        <span class="evento-detalle__infoLetra">TEMATICA      </span>
                        <span v-for="(tematica, index) in evento.tematicas" :key="index" class="evento-detalle__tematica">
                            {{ tematica.nombre }}<span v-if="index < evento.tematicas.length - 1">, </span>
                        </span>
                    </div>

                    <div class="evento-detalle__fecha">
                        📅 Fecha de incicio : <br>{{ new Date(evento.fechaInicio).toLocaleDateString("es-ES", { weekday: 'long', day: '2-digit', month: 'short' }) }}
                        {{ new Date(evento.fechaInicio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }} <br>
                        📅  Fecha de fin : <br>{{ new Date(evento.fechaFin).toLocaleDateString("es-ES", { weekday: 'long', day: '2-digit', month: 'short' }) }},
                        {{ new Date(evento.fechaFin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
                        
                    </div>
                    <div class="evento-detalle__lugar">
                        📍 {{ evento.ubicacion }}
                        <span class="evento-detalle__direccion">{{ evento.nombreOrg }}</span>
                    </div>

                    <div class="evento-detalle__acciones">
                        <button class="evento-detalle__boton">📅 Añadir al calendario</button>
                        <button class="evento-detalle__boton">⬇️ Descargar folleto</button>
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
    </div>
    
    <div v-else>
        <p>Cargando evento...</p>
    </div>
</template>


<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";
@import "@/assets/styles/_mixins.scss";

.evento-detalle {
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
    &__infoLetra{
        font-weight: bold;
        color: $color-lightred;
        font-family:$first-font ;
    }
    &__fecha,
    &__lugar {
        font-family:$first-font ;
        font-weight: bold;
    }

    &__direccion {
        font-family:$first-font ;
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
