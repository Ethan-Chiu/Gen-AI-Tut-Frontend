<script setup lang="ts">
import MainNav from './components/MainNav.vue'
import BarView from './components/BarView.vue'
import MatchList from './components/MatchList.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { ref, onMounted, onBeforeUnmount } from 'vue'
import api from '@/services/api'
import { ScrollArea } from '@/components/ui/scroll-area'

const data = ref([])

const fetchData = async () => {
  try {
    const response = await api.getUserScores()
    data.value = response.data.map((item: { userId: string; point: number }) => ({
      name: item.userId,
      points: item.point
    }))
    console.log(data.value)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

let intervalId: number | null = null
onMounted(() => {
  fetchData()
  // intervalId = setInterval(fetchData, 20 * 1000)
})

onBeforeUnmount(() => {
  // Clear the interval when the component is destroyed to prevent memory leaks
  if (intervalId !== null) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <div class="hidden flex-col md:flex min-h-screen">
    <!-- Top bar -->
    <div class="border-b">
      <div class="flex h-16 items-center px-4">
        <MainNav class="mx-6" />
      </div>
    </div>
    <!-- Content -->
    <div class="h-full flex flex-col flex-1 space-y-4 p-8 pt-6">
      <!-- Title -->
      <div class="flex items-center justify-between space-y-2">
        <h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <!-- Content -->
      <div class="space-y-4 h-0 flex-grow">
        <div class="h-full w-full flex space-x-2">
          <!-- Left panel -->
          <Card class="h-full grow">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent class="pl-2 h-[90%]">
              <BarView />
            </CardContent>
          </Card>
          <!-- Right panel -->
          <div class="min-w-[35%] w-[35%]">
            <Card class="h-full">
              <CardHeader>
                <CardTitle>Matches</CardTitle>
              </CardHeader>
              <CardContent class="h-[90%]">
                <ScrollArea class="h-full">
                  <MatchList />
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
