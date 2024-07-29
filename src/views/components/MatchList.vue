<template>
  <div>
    <p v-if="loading">Loading...</p>
    <p v-if="error">{{ error }}</p>
    <div v-if="!loading && !error">
      <Tabs default-value="all" class="flex flex-col">
        <div class="flex w-full flex-shrink-0">
          <TabsList class="w-full flex h-10">
            <TabsTrigger value="all" class="flex-1"> All </TabsTrigger>
            <TabsTrigger value="graded" class="flex-1"> Graded </TabsTrigger>
          </TabsList>
          <Button class="ml-2 w-14" size="icon" @click="fetchItems">
            <RefreshCcw class="size-4" />
            <span class="sr-only">Refresh</span>
          </Button>
        </div>
        <TabsContent value="all" class="w-full flex-grow">
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
        <TabsContent value="graded" class="w-full flex-grow">
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
import { ScrollArea } from '@/components/ui/scroll-area'

const matchListStore = useMatchListStore()
const route = useRoute()

const { fetchItems } = matchListStore
const { items, gradedMatches, loading, error } = storeToRefs(matchListStore)

onMounted(() => {
  fetchItems()
})
</script>
