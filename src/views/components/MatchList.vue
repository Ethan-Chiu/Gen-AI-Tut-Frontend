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
            <RouterLink :to="`/match/${item.id}`">
              <div class="rounded-md border-2 p-3 hover:bg-muted">
                <!-- Match Name & Date-->
                <div class="flex items-center">
                  <div class="flex items-center gap-2">
                    <Badge class="font-semibold">
                      {{ item.name }}
                    </Badge>
                    <span
                      :class="
                        cn(
                          'flex h-2 w-2 rounded-full',
                          item.matchStatus === 'CREATED' ? 'bg-blue-600' : 'bg-green-600'
                        )
                      "
                    />
                    <div
                      :class="
                        cn(
                          'text-xs font-medium',
                          item.matchStatus === 'CREATED' ? 'text-blue-600' : 'text-green-600'
                        )
                      "
                    >
                      {{ item.matchStatus }}
                    </div>
                  </div>
                  <!-- Date -->
                  <div class="ml-auto text-xs text-muted-foreground">
                    {{
                      formatDistanceToNow(new Date(item.players[0].createAt), { addSuffix: true })
                    }}
                  </div>
                </div>
                <!-- Topic -->
                <div class="text-xs font-medium m-2">
                  {{ item.topic.description }}
                </div>

                <div class="flex flex-row">
                  <!-- Player 1 -->
                  <div class="flex-1">
                    <div class="h-8 mb-4 rounded-full align-middle bg-muted flex items-center">
                      <p class="text-center w-full">
                        {{
                          item.players.find((player) => player.playerId === item.firstPlayerId)
                            ?.player.name
                        }}
                      </p>
                    </div>
                    <div v-if="item.result" class="text-4xl font-bold font-mono text-center">
                      {{ item.result.points.find((p) => p.userId === item.firstPlayerId)?.point }}
                    </div>
                  </div>
                  <Swords class="h-24 w-24 rounded-full p-6 bg-red-400" />
                  <!-- Player 2 -->
                  <div class="flex-1">
                    <div class="h-8 mb-4 rounded-full align-middle bg-muted flex items-center">
                      <p class="text-center w-full">
                        {{
                          item.players.find((player) => player.playerId !== item.firstPlayerId)
                            ?.player.name
                        }}
                      </p>
                    </div>
                    <div v-if="item.result" class="text-4xl font-bold font-mono text-center">
                      {{ item.result.points.find((p) => p.userId !== item.firstPlayerId)?.point }}
                    </div>
                  </div>
                </div>
              </div>
            </RouterLink>
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
import { Swords, RefreshCcw } from 'lucide-vue-next'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { formatDistanceToNow } from 'date-fns'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const matchListStore = useMatchListStore()

const { fetchItems } = matchListStore
const { items, loading, error } = storeToRefs(matchListStore)

onMounted(() => {
  fetchItems()
})
</script>
