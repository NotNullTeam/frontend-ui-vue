<template>
  <v-chart :option="option" class="w-full h-full" @click="onClick" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { use } from 'echarts/core';
import VChart from 'vue-echarts';
import { CanvasRenderer } from 'echarts/renderers';
import { GraphChart } from 'echarts/charts';
import { TooltipComponent } from 'echarts/components';
import { useGraphStore, type GraphNode } from '@/stores/graph';

use([CanvasRenderer, GraphChart, TooltipComponent]);

const graph = useGraphStore();

const colors: Record<string, string> = {
  USER_QUERY: '#1890ff',
  USER_RESPONSE: '#1890ff',
  AI_ANALYSIS: '#2f54eb',
  AI_CLARIFICATION: '#fa8c16',
  SOLUTION: '#52c41a',
};

function formatNode(n: GraphNode) {
  return {
    id: n.id,
    name: n.name,
    symbolSize: 50,
    itemStyle: {
      color: colors[n.type] || '#ccc',
      borderColor: graph.selectedNodeId === n.id ? '#fadb14' : '#fff',
      borderWidth: graph.selectedNodeId === n.id ? 3 : 1,
    },
  };
}

const option = computed(() => ({
  animationDurationUpdate: 300,
  tooltip: {},
  series: [
    {
      type: 'graph',
      layout: 'force',
      roam: true,
      draggable: true,
      focusNodeAdjacency: true,
      edgeSymbol: ['none', 'arrow'],
      force: { repulsion: 200, edgeLength: 120 },
      data: graph.nodes.map(formatNode),
      edges: graph.edges.map((e) => ({ source: e.source, target: e.target })),
      lineStyle: { color: '#aaa' },
    },
  ],
}));

function onClick(params: any) {
  if (params.data?.id) {
    graph.selectNode(params.data.id);
  }
}
</script>
