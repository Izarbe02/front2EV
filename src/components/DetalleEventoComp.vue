<script setup lang="ts">
const fecha: Date = new Date();

</script>

<template>

    <div class="evento-detalle">

        <h1 class="evento-detalle__titulo"> NOMBRE EVENTO </h1>

        <img src="https://i.pinimg.com/736x/f7/cf/ff/f7cfff1b6a2188e086c497c832b909cb.jpg" alt="Portada del evento" class="evento-detalle__portada" />

        <div class="evento-detalle__info">
            <div class="evento-detalle__fecha">
                📅 {{ fecha.toLocaleDateString("es-ES", { weekday: 'long', day: '2-digit', month: 'short' }) }},
                {{ fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
            </div>
            <div class="evento-detalle__lugar">
                📍 SVG2
                <span class="evento-detalle__direccion">CDLC</span>
            </div>
        </div>

        <div class="evento-detalle__acciones">
            <button class="evento-detalle__boton">📋 Copiar Enlace</button>
            <button class="evento-detalle__boton">📅 Añadir al calendario</button>
            <button class="evento-detalle__boton">⬇️ Descargar folleto</button>
        </div>

        <p class="evento-detalle__descripcion">Esta es la desc del evento Esta es la desc del eventoEsta es la desc del
            eventoEsta es la desc del eventoEsta es la desc del eventoEsta es la desc del eventoEsta es la desc del
            eventoEsta es la desc del eventoEsta es la desc del eventoEsta es la desc del eventoEsta es la desc del
            eventoEsta es la desc del eventoEsta es la desc del eventoEsta es la desc del eventoEsta es la desc del
            eventoEsta es la desc del eventoEsta es la desc del eventoEsta es la desc del eventoEsta es la desc del
            eventoEsta es la desc del eventoEsta es la desc del eventoEsta es la desc del eventoEsta es la desc del
            eventoEsta es la desc del eventoEsta es la desc del eventoEsta es la desc del eventoEsta es la desc del
            eventoEsta es la desc del eventoEsta es la desc del eventoEsta es la desc del eventoEsta es la desc del
            eventoEsta es la desc del eventoEsta es la desc del eventoEsta es la desc del eventoEsta es la desc del
            eventoEsta es la desc del eventoEsta es la desc del eventoEsta es la desc del eventoEsta es la desc del
            eventoEsta es la desc del evento</p>
    </div>

</template>

<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";
@import "@/assets/styles/_mixins.scss";
.evento-detalle {
    background-color: #111;
    color: #fff;
    max-width: 800px;
    margin-top: 5%;
    padding: 2%;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);

    &__titulo {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 10px;
    }

    &__portada {
        width: 100%;
        max-height: 400px;
        border-radius: 8px;
        margin-bottom: 15px;
    }

    &__info {
        font-size: 1rem;
        margin-bottom: 15px;
    }

    &__fecha,
    &__lugar {
        margin-bottom: 5px;
        font-weight: bold;
    }

    &__direccion {
        font-size: 0.9rem;
        color: #bbb;
    }

    &__acciones {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin: 15px 0;
    }

    &__boton {
        background-color: #272525;
        color: #d40202;
        border: 2px solid #d40202;
        padding: 10px;
        font-size: 1rem;
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

    &__descripcion {
        font-size: 1rem;
        color: #ddd;
        text-align: left;
        margin-top: 10px;
    }
}


@media (min-width: 900px) {
    .evento-detalle {
        max-width: 900px;

        &__titulo {
            font-size: 2rem;
        }

        &__acciones {
            flex-direction: row;
            justify-content: center;
        }

        &__boton {
            padding: 5% 7%;
            font-size: 1.2rem;
        }
    }
}
</style>
