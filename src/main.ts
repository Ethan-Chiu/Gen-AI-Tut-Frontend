import './assets/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueApexCharts from "vue3-apexcharts";
import ApexCharts from 'apexcharts';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueApexCharts);
app.config.globalProperties.$apexcharts = ApexCharts;

app.mount('#app')

// Add this when into a TypeScript codebase
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $apexcharts: typeof ApexCharts;
  }
}