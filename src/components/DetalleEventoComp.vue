<script setup lang="ts">
const fecha: Date = new Date();
</script>

<template>
    <div class="evento-detalle">
        

        <div class="evento-detalle__contenedor">
           
            <img src="https://i.pinimg.com/736x/04/91/53/04915321e9222613673b2e5e967b734f.jpg" alt="Portada del evento" class="evento-detalle__portada" />


            <div class="evento-detalle__contenido">
                <h1 class="evento-detalle__titulo"> NOMBRE EVENTO </h1>
                <div class="evento-detalle__info">
                    <div class="evento-detalle__categoria"><span class="evento-detalle__infoLetra">Concierto Satanico</span></div>
                    <div class="evento-detalle__fecha">
                        📅 {{ fecha.toLocaleDateString("es-ES", { weekday: 'long', day: '2-digit', month: 'short' }) }},
                        {{ fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
                    </div>
                    <div class="evento-detalle__lugar">
                        📍 SVG2
                        <span class="evento-detalle__direccion">CDLC</span>
                    </div>

                    <div class="evento-detalle__acciones">
                        <button class="evento-detalle__boton">📋 Copiar Enlace</button>
                        <button class="evento-detalle__boton">📅 Añadir al calendario</button>
                        <button class="evento-detalle__boton">⬇️ Descargar folleto</button>
                    </div>
                    <div class="evento-detalle__descripcion">
                        <p class="evento-detalle__subtitulo">Descripción del evento</p>
                        <p class="evento-detalle__descripcion">
                            Esta es la desc del evento coorspondiente irira en este container esto es un texto de relleno para ver la magnitud del container. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni, praesentium. Et mollitia excepturi amet veniam ad nisi ut tempora incidunt iusto error illo ab facere reiciendis quidem, repellendus minima aspernatur.
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

.evento-detalle {
    background-color: #111;
    color: #fff;
    margin: 5% auto;
    margin-top: 90px;
    padding: 3%;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);

    &__titulo {
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
    }
    &__fecha,
    &__lugar {
        font-weight: bold;
    }

    &__direccion {
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
        font-size: 1.5rem;
        color: $color-lightred;
        font-weight: bold;
        text-align: left;
        margin-top: 20px;
    }

    &__descripcion {
        font-size: 1.2rem;
        color: #ddd;
        text-align: left;
        margin-top: 10px;
    }
}

/* Estilos para pantallas grandes */
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
