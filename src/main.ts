import { createApp } from 'vue'
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import routes from '@/router/routes';
import './style.css'
import App from './App.vue'
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { GraphChart } from 'echarts/charts';
import { TooltipComponent } from 'echarts/components';

use([CanvasRenderer, GraphChart, TooltipComponent]);

const app = createApp(App);
app.use(createPinia());
app.component('v-chart', VChart);

const router = createRouter({
  history: createWebHistory(),
  routes
});
app.use(router);

app.mount('#app');
