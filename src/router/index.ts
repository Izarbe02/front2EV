import { createRouter, createWebHistory } from 'vue-router'

import HomePageView from '@/views/HomePageView.vue'
import LogInView from '@/views/LogInView.vue'
import EventosView from '@/views/EventosView.vue'
import EventoDetalleView from '@/views/EventoDetalleView.vue'
import aboutUsView from '@/views/AboutUsView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'HomePage',
      component: HomePageView,
    },
    {
      path: '/LogIn',
      name: 'LogIn',
      component: LogInView,
    },
    {
      path: '/Eventos',
      name: 'Eventos',
      component: EventosView,
    },
    {
      path: '/EventoDetalle',
      name: 'EventoDetalle',
      component: EventoDetalleView,
    },
    {
      path: '/aboutUs',
      name: 'AboutUs',
      component: aboutUsView,
    },
   /* {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    }, */
  ],
})

export default router
