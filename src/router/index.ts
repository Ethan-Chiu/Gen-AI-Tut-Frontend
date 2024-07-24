import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MatchView from '@/views/MatchView.vue'
import MatchList from '@/views/components/MatchList.vue'
import MatchDetail from '@/views/components/MatchDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/match/:matchId(\\d+)?',
      component: MatchView,
      children: [
        {
          path: '',
          components: {
            list: MatchList,
            detail: MatchDetail
          }
        }
      ]
    }
  ]
})

export default router
