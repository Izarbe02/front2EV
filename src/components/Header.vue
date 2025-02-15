<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Navbar'
});
</script>

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
                        <v-btn text class="navbar__link">Inicio</v-btn>
                        <v-btn text class="navbar__link">Servicios</v-btn>
                        <v-btn text class="navbar__link">Contacto</v-btn>
                    </div>

                    <div class="navbar__section-right">
                        <v-btn class="navbar__login-button">
                            <v-icon left>mdi-account-circle</v-icon>
                            Mi Cuenta
                        </v-btn>
                    </div>
                </v-container>
            </v-app-bar>
        </v-layout>
    
</template>

<style lang="scss" scoped>
.navbar {
    background: #f8f9fa;
    padding: 0 16px;
    display: flex;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;

    &__container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: nowrap;
        width: 100%;
    }

    &__section-left,
    &__section-right {
        display: flex;
        align-items: center;
    }

    &__menu-button {
        margin-right: 8px;
    }

    &__logo {
        height: 40px;
        margin-left: 8px;
    }

    &__navigation {
        display: flex;
        gap: 16px;
    }

    &__link {
        font-size: 16px;
        color: #333;
        text-transform: none;
    }

    &__login-button {
        background: #007bff;
        color: white;
        text-transform: none;
    }

    @media (max-width: 768px) {
        .navbar__navigation {
            display: none;
        }
    }
}
</style>
