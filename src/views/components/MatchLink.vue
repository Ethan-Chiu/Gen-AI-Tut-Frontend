<template>
  <RouterLink :to="`/match/${match.id}`">
    <div :class="cn('rounded-md border-2 p-3 hover:bg-muted', selected && 'bg-sky-100')">
      <!-- Match Name & Date-->
      <div class="flex items-center">
        <div class="flex items-center gap-2">
          <Badge class="font-semibold">
            {{ match.name }}
          </Badge>
          <span
            :class="
              cn(
                'flex h-2 w-2 rounded-full',
                match.matchStatus === 'CREATED' ? 'bg-blue-600' : 'bg-green-600'
              )
            "
          />
          <div
            :class="
              cn(
                'text-xs font-medium',
                match.matchStatus === 'CREATED' ? 'text-blue-600' : 'text-green-600'
              )
            "
          >
            {{ match.matchStatus }}
          </div>
        </div>
        <!-- Date -->
        <div class="ml-auto text-xs text-muted-foreground">
          {{ formatDistanceToNow(new Date(match.players[0].createAt), { addSuffix: true }) }}
        </div>
      </div>
      <!-- Topic -->
      <div class="text-xs font-medium m-2">
        {{ match.topic.description }}
      </div>

      <div class="flex flex-row">
        <!-- Player 1 -->
        <div class="flex-1">
          <div class="h-8 mb-4 rounded-full align-middle bg-muted flex items-center">
            <p class="text-center w-full">
              {{
                match.players.find((player) => player.playerId === match.firstPlayerId)?.player.name
              }}
            </p>
          </div>
          <div v-if="match.result" class="text-4xl font-bold font-mono text-center">
            {{ match.result.points.find((p) => p.userId === match.firstPlayerId)?.point }}
          </div>
        </div>
        <Swords class="h-24 w-24 rounded-full p-6 bg-red-400" />
        <!-- Player 2 -->
        <div class="flex-1">
          <div class="h-8 mb-4 rounded-full align-middle bg-muted flex items-center">
            <p class="text-center w-full">
              {{
                match.players.find((player) => player.playerId !== match.firstPlayerId)?.player.name
              }}
            </p>
          </div>
          <div v-if="match.result" class="text-4xl font-bold font-mono text-center">
            {{ match.result.points.find((p) => p.userId !== match.firstPlayerId)?.point }}
          </div>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { Swords } from 'lucide-vue-next'
import { formatDistanceToNow } from 'date-fns'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import type { Match } from '@/services/types/match'

defineProps<{
  match: Match
  selected: boolean
}>()
</script>
