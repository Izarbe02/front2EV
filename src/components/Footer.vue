<template>
    <v-app>
        <v-footer class="footer">
            <v-container class="footer__container">
                <div class="footer__section footer__section--top">
                    <v-img src="/logo.png" alt="Logo" class="footer__logo" contain></v-img>
                    <span class="footer__text">&copy; 2025 Mi Empresa. Todos los derechos reservados.</span>
                </div>

                <div class="footer__section footer__section--middle">
                    <v-row justify="center" class="footer__links">
                        <v-col cols="auto">
                            <v-btn text class="footer__link">Política de Privacidad</v-btn>
                        </v-col>
                        <v-col cols="auto">
                            <v-btn text class="footer__link">Términos y Condiciones</v-btn>
                        </v-col>
                        <v-col cols="auto">
                            <v-btn text class="footer__link">Contacto</v-btn>
                        </v-col>
                    </v-row>
                </div>

                <div class="footer__section footer__section--bottom">
                    <v-row justify="center" class="footer__socials">
                        <v-col cols="auto">
                            <v-btn icon class="footer__social-button">
                                <v-icon>mdi-facebook</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col cols="auto">
                            <v-btn icon class="footer__social-button">
                                <v-icon>mdi-twitter</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col cols="auto">
                            <v-btn icon class="footer__social-button">
                                <v-icon>mdi-instagram</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </div>
            </v-container>
        </v-footer>
    </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'FooterComponent'
});
</script>

<style lang="scss" scoped>
.footer {
    background: #f8f9fa;
    padding: 16px 0;
    display: flex;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 1000;

    &__container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        gap: 16px;
    }

    &__section {
        width: 100%;
    }

    &__links,
    &__socials {
        display: flex;
        justify-content: center;
        gap: 16px;
    }

    &__logo {
        height: 40px;
    }

    &__text {
        font-size: 14px;
        color: #555;
    }

    &__link {
        font-size: 14px;
        color: #333;
        text-transform: none;
    }

    &__social-button {
        color: #555;
    }
}
</style>
