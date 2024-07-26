import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'
import { type Match } from '@/services/types/match'

export const useMatchListStore = defineStore('match_list', () => {
  const items = ref<Match[]>([])
  const gradedMatches = ref<Match[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchItems() {
    loading.value = true
    error.value = null
    try {
      items.value = await api.getAllMatches()
      gradedMatches.value = items.value.filter((m) => m.matchStatus === 'GRADED')
      console.log('Item value', items.value)
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return { items, gradedMatches, loading, error, fetchItems }
})
