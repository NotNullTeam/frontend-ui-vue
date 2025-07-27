<template>
    <div class="dashboard grid grid-cols-2 gap-4 h-full">
      <div class="bg-white p-4 rounded shadow">
        <v-chart :option="pieOption" auto-resize style="height:250px" />
      </div>
      <div class="bg-white p-4 rounded shadow">
        <v-chart :option="lineOption" auto-resize style="height:250px" />
      </div>
      <div class="bg-white p-4 rounded shadow col-span-2">
        <v-chart :option="heatOption" auto-resize style="height:250px" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { use } from 'echarts/core';
  import VChart from 'vue-echarts';
  import {
    PieChart,
    LineChart,
    HeatmapChart
  } from 'echarts/charts';
  import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    VisualMapComponent
  } from 'echarts/components';
  import { CanvasRenderer } from 'echarts/renderers';
  
  use([
    PieChart,
    LineChart,
    HeatmapChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    VisualMapComponent,
    CanvasRenderer
  ]);
  
  const pieOption = {
    title: { text: '故障分类', left: 'center' },
    tooltip: {},
    legend: { bottom: 0 },
    series: [
      {
        type: 'pie',
        radius: '60%',
        data: [
          { value: 30, name: '链路故障' },
          { value: 20, name: '配置问题' },
          { value: 10, name: '硬件损坏' },
          { value: 40, name: '其他' }
        ]
      }
    ]
  };
  
  const lineOption = {
    title: { text: '解决率趋势', left: 'center' },
    tooltip: {},
    xAxis: { type: 'category', data: ['1月', '2月', '3月', '4月', '5月'] },
    yAxis: { type: 'value' },
    series: [{ type: 'line', data: [50, 55, 60, 65, 70] }]
  };
  
  const heatOption = {
    title: { text: '知识覆盖度', left: 'center' },
    tooltip: {},
    xAxis: { type: 'category', data: ['OSPF', 'BGP', 'MPLS', 'IPsec', 'QoS'] },
    yAxis: { type: 'category', data: ['Huawei', 'Cisco', 'Juniper'] },
    visualMap: { min: 0, max: 100, orient: 'horizontal', left: 'center', bottom: 0 },
    series: [
      {
        type: 'heatmap',
        label: { show: true },
        data: [
          [0, 0, 40], [1, 0, 80], [2, 0, 70], [3, 0, 90], [4, 0, 55],
          [0, 1, 95], [1, 1, 85], [2, 1, 80], [3, 1, 70], [4, 1, 45],
          [0, 2, 65], [1, 2, 50], [2, 2, 30], [3, 2, 55], [4, 2, 20]
        ]
      }
    ]
  };
  </script>
  
  <style scoped>
  .dashboard {
    height: 100%;
  }
  </style>