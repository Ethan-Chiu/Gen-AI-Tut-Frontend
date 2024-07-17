<script setup lang="ts">

import { ref, onMounted } from 'vue';
import api from '@/services/api';

const data = ref<any[]>([]);

const fetchData = async () => {
  try {
    const matches = await api.getGradedMatches();
    data.value = matches
    console.log(data.value)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(() => {
  fetchData();
});

</script>

<template>
  <div class="space-y-8">
    <div class="flex items-center">
      <div class="ml-4 space-y-1">
        <p class="text-sm font-medium leading-none">
          Olivia Martin
        </p>
        <p class="text-sm text-muted-foreground">
          olivia.martin@email.com
        </p>
      </div>
      <div class="ml-auto font-medium">
        +$1,999.00
      </div>
    </div>
  </div>
</template>
