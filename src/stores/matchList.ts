import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'

export const useMatchListStore = defineStore('match_list', () => {
  const items = ref<string[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchItems() {
    loading.value = true
    error.value = null
    try {
      items.value = await api.getAllOngingMatches()
      console.log(items.value)
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return { items, loading, error, fetchItems }
})
