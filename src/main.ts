

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { VCalendar } from "vuetify/labs/VCalendar";
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@fortawesome/fontawesome-free/css/all.css';
// import vuetify from "./plugins/vuetify";

const vuetify = createVuetify({
  components: {
    ...components,
    VCalendar,
  },
  directives,
});

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
