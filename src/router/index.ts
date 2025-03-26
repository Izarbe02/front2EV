import { createRouter, createWebHistory } from 'vue-router'

import HomePageView from '@/views/HomePageView.vue'
import LogInView from '@/views/LogInView.vue'
import EventosView from '@/views/EventosView.vue'
import EventoDetalleView from '@/views/EventoDetalleView.vue'
import aboutUsView from '@/views/AboutUsView.vue'
import AdminPageView from '@/views/AdminPageView.vue'
import ProductoView from '@/views/ProductoView.vue'
import OrganizadorPageView from '@/views/OrganizadorPageView.vue'
import OrganizadorDetalleView from '@/views/OrganizadorDetalleView.vue'
import Register from '@/views/RegistroView.vue'
import PatrocinadoresView from '@/views/PatrocinadoresView.vue'
import PatrocinadorUpdateFormView from '@/views/PatrocinadorUpdateFormView.vue'
import PatrocinadorCreateFormView from '@/views/PatrocinadorCreateFormView.vue'


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
    {
      path: '/Administrador',
      name: 'Administrador',
      component: AdminPageView
    },
    {
      path: '/Productos',
      name: 'Productos',
      component: ProductoView
      
    },
    {
      path: '/Organizadores',
      name: 'Organizadores',
      component: OrganizadorPageView
    },
    {
      path: '/OrganizadorDetalle',
      name: 'OrganizadorDetalle',
      component: OrganizadorDetalleView
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Patrocinadores',
      name: 'Patrocinadores',
      component: PatrocinadoresView
    },
    {
      path: '/PatrocinadorUpdateForm',
      name: 'PatrocinadorUpdateForm',
      component: PatrocinadorUpdateFormView
    },
    {
      path: '/PatrocinadorCreateFormView',
      name: 'PatrocinadorCreateFormView',
      component: PatrocinadorCreateFormView
    }
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


