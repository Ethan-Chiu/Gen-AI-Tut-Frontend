<template>
  <div v-if="!match">
    <p>Select a match</p>
  </div>
  <div class="h-full w-full">
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <div v-if="!loading && !error && match">
      <div
        v-if="!match?.historyMsgs || !match.historyMsgs.length"
        class="h-32 bg-muted rounded-lg flex items-center justify-center"
      >
        <p class="w-full text-center text-4xl font-bold font-mono">No Messages Yet</p>
      </div>
      <div v-else class="h-16 bg-muted rounded-lg flex items-center justify-center">
        <p class="w-full text-center text-4xl font-bold font-mono">Messages</p>
      </div>
      <div v-for="msg of match?.historyMsgs" :key="msg.id">
        <div
          :class="
            cn(
              'h-8 w-24 mx-4 my-2 rounded-full align-middle bg-muted flex items-center',
              msg.userId === match.firstPlayerId ? ' mr-auto' : ' ml-auto'
            )
          "
        >
          <p class="text-center w-full">
            {{ match.players.find((player) => player.playerId === msg.userId)?.player.name }}
          </p>
        </div>
        <div
          :class="
            cn(
              'w-3/4 min-h-20 border rounded-lg mx-4 p-4',
              msg.userId === match.firstPlayerId
                ? 'bg-yellow-200 mr-auto'
                : 'bg-emerald-200 ml-auto'
            )
          "
        >
          {{ msg.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'
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
    const selectedMatch = items.value.find((item) => item.id === matchId) ?? null
    selectedMatch?.historyMsgs.sort((a, b) => (a.createAt > b.createAt ? 1 : -1))
    match.value = selectedMatch
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
