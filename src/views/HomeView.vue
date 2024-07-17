<script setup lang="ts">
import BarView from './components/BarView.vue'
import MainNav from './components/MainNav.vue'
import GradedMatch from './components/GradedMatch.vue'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { ref, onMounted, onBeforeUnmount } from 'vue'
import api from '@/services/api'
import SearchBox from './components/SearchBox.vue'

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
  intervalId = setInterval(fetchData, 20 * 1000)
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
        <div class="ml-auto flex items-center space-x-4">
          <SearchBox />
        </div>
      </div>
    </div>
    <!-- Content -->
    <div class="h-full flex flex-col flex-1 space-y-4 p-8 pt-6">
      <div class="flex items-center justify-between space-y-2">
        <h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div class="space-y-4 h-0 flex-grow">
        <Tabs default-value="overview" class="h-full">
          <div class="h-full flex flex-col">
            <TabsList>
              <TabsTrigger value="overview"> Teams </TabsTrigger>
              <TabsTrigger value="matches"> Matches </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" class="h-full w-full">
              <div class="h-full w-full flex space-x-2">
                <Card class="h-full grow">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent class="pl-2 h-[90%]">
                    <BarView />
                  </CardContent>
                </Card>
                <div class="w-[30%]">Test</div>
              </div>
            </TabsContent>
            <TabsContent value="matches" as-child>
              <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card class="col-span-3">
                  <CardHeader>
                    <CardTitle>On-going Matches</CardTitle>
                    <CardDescription> On-going Matches </CardDescription>
                  </CardHeader>
                  <CardContent> Slot </CardContent>
                </Card>
                <Card class="col-span-4">
                  <CardHeader>
                    <CardTitle>Graded Matches</CardTitle>
                    <CardDescription> These matches have been graded. </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <GradedMatch />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  </div>
</template>
