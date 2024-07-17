<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/services/api'

const fetchData = async () => {
  try {
    const response = await api.getUserScores()
    series.value[0].data = response.data.map((item: { userId: string; point: number }) => ({
      x: `Team ${item.userId}`,
      y: item.point
    }))
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const chartOptions = ref({
  chart: {
    id: 'vuechart-example'
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      borderRadiusApplication: 'end',
      horizontal: true
    }
  },
  fill: {
    colors: '#0d9488'
  },
  xaxis: {
    type: 'category'
  }
})

const series = ref([
  {
    name: 'Score',
    data: []
  }
])

onMounted(() => {
  fetchData()
})
</script>

<template>
  <apexchart
    width="100%"
    height="100%"
    type="bar"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>
