<script setup lang="ts">
import { cn } from '@/lib/utils'
</script>

<template>
  <nav :class="cn('flex items-center space-x-4 lg:space-x-6', $attrs.class ?? '')">
    <RouterLink to="/" class="text-sm font-medium transition-colors hover:text-primary">
      Overview
    </RouterLink>
    <RouterLink
      to="/match"
      class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    >
      Match
    </RouterLink>
  </nav>
</template>
