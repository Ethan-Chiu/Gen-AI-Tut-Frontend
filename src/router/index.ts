import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/match/:matchId(\\d+)?',
      component: () => import('@/views/MatchView.vue'),
      children: [
        {
          path: '',
          components: {
            list: () => import('@/views/components/MatchList.vue'),
            detail: () => import('@/views/components/MatchDetail.vue')
          }
        }
      ]
    }
  ]
})

export default router
