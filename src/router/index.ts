import { createRouter, createWebHistory } from 'vue-router'

import UsersView from '@/views/UsersView.vue'
import HomePageView from '@/views/HomePageView.vue'
import LogInView from '@/views/LogInView.vue'
import EventosView from '@/views/EventosView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  
    {
      path: '/users',
      name: 'users',
      component: UsersView,
    },

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
