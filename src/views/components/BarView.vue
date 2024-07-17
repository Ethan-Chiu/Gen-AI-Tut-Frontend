<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/services/api'

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

const chartOptions = ref({
  chart: {
    id: 'vuechart-example'
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
  }
})

const series = ref([
  {
    name: 'series-1',
    data: [30, 40, 35, 50, 49, 60, 70, 91]
  }
])

onMounted(() => {
  fetchData()
})
</script>

<template>
  <apexchart width="500" type="bar" :options="chartOptions" :series="series"></apexchart>
  <!-- <BarChart :data="data" :categories="['points']" :index="'name'" :rounded-corners="4" /> -->
</template>
