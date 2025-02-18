<template>
    <v-layout>
        <v-app-bar app class="navbar">
            <v-container class="navbar__container">
                <div class="navbar__section-left">
                    <v-btn icon class="navbar__menu-button">
                        <v-icon>mdi-menu</v-icon>
                    </v-btn>
                    <v-img src="/logo.png" alt="Logo" class="navbar__logo" contain></v-img>
                </div>

                <div class="navbar__navigation">
                    <v-btn text to="/Eventos" class="navbar__link navbar__link--active">Eventos</v-btn>
                    <v-btn text to="/Organizadores" class="navbar__link">Organizadores</v-btn>
                    <v-btn text to="/About us" class="navbar__link">About us</v-btn>
                    <v-btn text to="/contacto" class="navbar__link">Contacto</v-btn>
                </div>
            </v-container>

            <v-container class="navbar__search">
                <v-text-field class="navbar__search-input" placeholder="Artista" dense solo hide-details>
                </v-text-field>
                <!----> <v-btn class="navbar__search-button">Buscar</v-btn>
            </v-container>
        </v-app-bar>
    </v-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Navbar'
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

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
        color: $color-lightred;
        text-transform: none;
        position: relative;

        &:hover,
        &--active {
            color: $color-whitered;
        }

        &:hover::after {
            content: "";
            width: 100%;
            height: 2px;
            background: $color-red;
            position: absolute;
            bottom: -2px;
            left: 0;
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
        color: $color-lightred;
        border-radius: 4px;
        padding-left: 8px;
        font-size: 16px;

        &::placeholder {
            color: $color-lightred;
        }
    }

    &__search-input:hover {
        color: $color-whitered;
    }

    &__search-button {
        background: transparent;
        border: 1px solid $color-red;
        color: $color-lightred;
        text-transform: none;

        &:hover {
            background: $color-whitered;
        }
    }

    .footer {
        height: 80px;
        padding: 20px;
    }

    @media (max-width: 768px) {
        .navbar {
            padding: 8px;
            height: 80px;
        }

        .navbar__container {
            flex-direction: column;
            align-items: center;

        }

        .navbar__navigation {
            flex-direction: column;
            align-items: center;
            gap: 8px;
        }

        .navbar__search {
            flex-direction: column;
            align-items: center;
            width: 100%;
        }
    }
}
</style>
