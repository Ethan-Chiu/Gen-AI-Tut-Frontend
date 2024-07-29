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
        <h2 class="text-3xl font-bold tracking-tight">Match</h2>
      </div>
      <!-- Content -->
      <div class="space-y-4 h-0 flex-grow">
        <div class="h-full w-full flex space-x-2">
          <!-- Left panel -->
          <div class="h-full min-w-[30%] w-[30%]">
            <ScrollArea class="h-full">
              <RouterView name="list" />
            </ScrollArea>
          </div>
          <Separator orientation="vertical" />
          <!-- Right panel -->
          <div class="h-full grow">
            <ScrollArea class="h-full">
              <RouterView name="detail" />
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import MainNav from '@/views/components/MainNav.vue'
</script>
