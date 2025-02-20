<template>
    <v-layout>
        <v-app-bar app class="navbar">
            <v-container class="navbar__container">
                <div class="navbar__navigation">
                    <v-btn text to="/eventos" class="navbar__link navbar__link--active">Eventos</v-btn>
                    <v-btn text to="/organizadores" class="navbar__link">Organizadores</v-btn>
                    <v-btn text to="/about-us" class="navbar__link">About us</v-btn>
                    <v-btn text to="/contacto" class="navbar__link">Contacto</v-btn>
                </div>
                <div class="navbar__section-left">
                    <v-btn icon class="navbar__menu-button" @click="drawer = !drawer">
                        <v-icon>mdi-menu</v-icon>
                    </v-btn>
                    <v-img src="/logo.png" alt="Logo" class="navbar__logo" contain></v-img>
                </div>
            </v-container>
            
            <v-container class="navbar__search">
                <v-text-field 
                    class="navbar__search-input" 
                    placeholder="Eventos..." 
                    dense 
                    solo 
                    hide-details>
                </v-text-field>
                <v-btn class="navbar__search-button">Buscar</v-btn>
            </v-container>
        </v-app-bar>
    </v-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            drawer: false
        };
    }
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
@import "@/assets/styles/_mixins.scss";


.navbar {
    background: $color-darkgray !important;
    padding: 8px 16px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    font-family: $first-font;

    &__container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }

    &__section-left {
        display: flex;
        align-items: center;
    }

    &__menu-button {
        margin-right: 8px;
        color: $color-lightred;
    }

    &__logo {
        height: 40px;
        margin-left: 8px;
    }

    &__navigation {
        display: flex;
        gap: 12px;
        justify-content: center;
        width: 100%;
    }

    &__link {
        font-size: 16px;
        font-weight: bold;
        color: white;
        text-transform: none;
        position: relative;

        &:hover,
        &--active {
            color: $color-red;
        }
    }

    &__search {
        display: flex;
        align-items: center;
        gap: 10px;
        justify-content: center;
        width: 100%;
        padding: 10px;
    }

    &__search-input {
        width: 100%;
        max-width: 280px;
        background: $color-darkgray !important;
        border: 1px solid $color-red;
        color: white;
        border-radius: 4px;
        padding-left: 8px;
        font-size: 16px;

        &::placeholder {
            color: white;
        }
    }

    &__search-input:hover {
        color: $color-red;
    }

    &__search-button {
        @include boton-rojo;


        &:hover {
            background: $color-red;
            color: white;
        }
    }

    @media (max-width: 768px) {
        .navbar {
            height: 60px;
            padding: 8px 12px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }

        .navbar__logo {
            height: 30px;
        }

        .navbar__menu-button {
            width: 36px;
            height: 36px;
        }

        .navbar__search {
            flex-direction: row;
            justify-content: center;
            align-items: center;
            width: auto;
            flex-grow: 1;
            background: $color-darkgray;
            border-radius: 8px;
            padding: 4px 8px;
            border: 1px solid $color-lightred;
        }

        .navbar__search-input {
            max-width: 160px;
            font-size: 14px;
            background: transparent;
            border: none;
            color: white;
        }

        .navbar__search-button {
            font-size: 14px;
            padding: 4px 12px;
            background: transparent;
            border: none;
            color: white;
        }
    }
        .navbar {
            height: 120px;
            padding: 12px 16px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .navbar__navigation {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            width: 100%;
            gap: 12px;
        }

        .navbar__search {
            flex-direction: row;
            justify-content: center;
            align-items: center;
            width: 100%;
        }

        .navbar__search-input {
            max-width: 220px;
            font-size: 14px;
        }

        .navbar__search-button {
            font-size: 14px;
            padding: 4px 12px;
        }
    }
</style>