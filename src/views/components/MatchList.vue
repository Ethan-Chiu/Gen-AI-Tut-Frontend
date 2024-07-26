<template>
  <div>
    <p v-if="loading">Loading...</p>
    <p v-if="error">{{ error }}</p>
    <div v-if="!loading && !error">
      <Tabs default-value="all">
        <div class="flex w-full">
          <TabsList class="w-full flex h-10">
            <TabsTrigger value="all" class="flex-1"> All </TabsTrigger>
            <TabsTrigger value="graded" class="flex-1"> Graded </TabsTrigger>
          </TabsList>
          <Button class="ml-2 w-14" size="icon" @click="fetchItems">
            <RefreshCcw class="size-4" />
            <span class="sr-only">Refresh</span>
          </Button>
        </div>
        <TabsContent value="all" class="h-full w-full">
          <div v-for="item of items" :key="item.id" class="my-2">
            <MatchLink
              :match="item"
              :selected="
                route.params.matchId !== undefined &&
                parseInt(route.params.matchId.toString()) === item.id
              "
            />
          </div>
        </TabsContent>
        <TabsContent value="graded" class="h-full w-full">
          <div v-for="item of gradedMatches" :key="item.id" class="my-2">
            <MatchLink
              :match="item"
              :selected="
                route.params.matchId !== undefined &&
                parseInt(route.params.matchId.toString()) === item.id
              "
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMatchListStore } from '@/stores/matchList'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { RefreshCcw } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import MatchLink from './MatchLink.vue'
import { useRoute } from 'vue-router'

const matchListStore = useMatchListStore()
const route = useRoute()

const { fetchItems } = matchListStore
const { items, gradedMatches, loading, error } = storeToRefs(matchListStore)

onMounted(() => {
  fetchItems()
})
</script>
