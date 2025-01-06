import { createRouter, createWebHistory } from 'vue-router'
import main from '../views/main.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'main',
        component: main
      },
      {
        path: '/ranking',
        name: 'ranking',
        component: () => import('../views/ranking.vue'),
      }
    ]
  })

export default router