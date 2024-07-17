<script setup lang="ts">
import { BarChart } from '@/components/ui/chart-bar'

import { ref, onMounted } from 'vue';
import api from '@/services/api';

const data = ref([]);

const fetchData = async () => {
  try {
    const response = await api.getUserScores();
    data.value = response.data.map((item: { userId: string; point: number }) => ({ name: item.userId, points: item.point }));
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
  <BarChart :data="data" :categories="['points']" :index="'name'" :rounded-corners="4" />
</template>
