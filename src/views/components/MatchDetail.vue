<template>
  <div v-if="!match">
    <p>Select a match</p>
  </div>
  <div class="h-full w-full">
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <div v-if="!loading && !error && match">
      <div v-for="msg of match?.historyMsgs" :key="msg.id">
        {{ msg.text }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Match } from '@/services/types/match'
import { useMatchListStore } from '@/stores/matchList'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const match = ref<Match | null>(null)
const route = useRoute()

const matchListStore = useMatchListStore()

const { fetchItems } = matchListStore
const { items, loading, error } = storeToRefs(matchListStore)

const fetchMatch = () => {
  const matchId = parseInt(route.params.matchId.toString())
  if (matchId) {
    console.log('items', items.value)
    match.value = items.value.find((item) => item.id === matchId) ?? null
    console.log('match', match.value)
  } else {
    match.value = null
  }
}
onMounted(() => {
  fetchItems()
  fetchMatch()
})

watch(() => route.params.matchId, fetchItems)
watch(() => route.params.matchId, fetchMatch)
watch(() => items.value, fetchMatch)
</script>
