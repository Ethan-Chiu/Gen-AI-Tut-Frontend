<script setup lang="ts">
import Overview from './components/BarView.vue'
import DateRangePicker from './components/DateRangePicker.vue'
import MainNav from './components/MainNav.vue'
import RecentSales from './components/RecentSales.vue'
import GradedMatch from './components/GradedMatch.vue'
import Search from './components/Search.vue'
import TeamSwitcher from './components/TeamSwitcher.vue'
import UserNav from './components/UserNav.vue'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'


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
  <div class="md:hidden">
    <VPImage
      alt="Dashboard"
      width="1280"
      height="1214" class="block" :image="{
        dark: '/examples/dashboard-dark.png',
        light: '/examples/dashboard-light.png',
      }"
    />
  </div>

  <div class="hidden flex-col md:flex">
    <div class="border-b">
      <div class="flex h-16 items-center px-4">
        <MainNav class="mx-6" />
        <div class="ml-auto flex items-center space-x-4">
          <Search />
          <UserNav />
        </div>
      </div>
    </div>
    <div class="flex-1 space-y-4 p-8 pt-6">
      <div class="flex items-center justify-between space-y-2">
        <h2 class="text-3xl font-bold tracking-tight">
          Dashboard
        </h2>
      </div>
      <Tabs default-value="overview" class="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            Teams
          </TabsTrigger>
          <TabsTrigger value="matches">
            Matches
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" class="space-y-4">
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            
          </div>
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card class="col-span-7">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent class="pl-2">
                <Overview />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="matches">
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card class="col-span-3">
              <CardHeader>
                <CardTitle>On-going Matches</CardTitle>
                <CardDescription>
                  On-going Matches
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
            <Card class="col-span-4">
              <CardHeader>
                <CardTitle>Graded Matches</CardTitle>
                <CardDescription>
                  These matches have been graded.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <GradedMatch />
              </CardContent>
            </Card>
          </div>
        </TabsContent> 
      </Tabs>
    </div>
  </div>
</template>
