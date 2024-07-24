import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'
import { type Match } from '@/services/types/match'

export const useMatchListStore = defineStore('match_list', () => {
  const items = ref<Match[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchItems() {
    loading.value = true
    error.value = null
    try {
      items.value = await api.getAllMatches()
      console.log('Item value', items.value)
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return { items, loading, error, fetchItems }
})
