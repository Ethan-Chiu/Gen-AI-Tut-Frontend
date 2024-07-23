<template>
  <div>
    <h1>Item List</h1>
    <button @click="fetchItems" :disabled="loading">Fetch Items</button>
    <p v-if="loading">Loading...</p>
    <p v-if="error">{{ error }}</p>
    <ul v-if="!loading && !error">
      <li v-for="item in items" :key="item">{{ item.toString() }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useMatchListStore } from '@/stores/matchList'
import { onMounted } from 'vue'

const matchListStore = useMatchListStore()

const { items, loading, error, fetchItems } = matchListStore

onMounted(() => {
  fetchItems()
})
</script>
