<template>
  <a-tabs class="h-full" tab-position="top" size="small" style="height:100%">
    <a-tab-pane key="detail" tab="节点详情">
      <div class="p-2" v-if="node">
        <p class="font-bold mb-1">{{ node.name }}</p>
        <p>ID: {{ node.id }}</p>
        <p>类型: {{ node.type }}</p>
      </div>
      <div class="p-2 text-gray-400" v-else>请选择节点</div>
    </a-tab-pane>
    <a-tab-pane key="source" tab="知识溯源">
      <div class="p-2">知识溯源内容...</div>
    </a-tab-pane>
    <a-tab-pane key="cmd" tab="可复制命令">
      <a-tabs>
        <a-tab-pane key="huawei" tab="华为">命令...</a-tab-pane>
        <a-tab-pane key="cisco" tab="思科">命令...</a-tab-pane>
      </a-tabs>
    </a-tab-pane>
    <a-tab-pane key="doc" tab="文档详情">
      <div class="p-2" v-if="doc">
        <p class="font-bold mb-1">{{ doc.name }}</p>
        <p>Vendor: {{ doc.vendor }}</p>
        <p class="mb-1">
          标签:
          <a-tag v-for="t in doc.tags" :key="t" class="mr-1">{{ t }}</a-tag>
        </p>
        <p>状态: <a-tag :color="statusColor(doc.status)">{{ doc.status }}</a-tag></p>
        <a-progress v-if="doc.status === 'PARSING'" :percent="doc.progress" size="small" class="mt-1" />
        <div v-if="doc.logs" class="mt-2 text-xs whitespace-pre-line">{{ doc.logs }}</div>
        <a-button v-if="doc.status === 'FAILED'" size="small" class="mt-2" @click="reparse(doc.id)">重新解析</a-button>
      </div>
      <div class="p-2 text-gray-400" v-else>请选择文档</div>
    </a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useGraphStore } from '@/stores/graph';
import { useKnowledgeStore } from '@/stores/knowledge';

const graph = useGraphStore();
const knowledge = useKnowledgeStore();
const node = computed(() => graph.nodes.find((n) => n.id === graph.selectedNodeId));
const doc = computed(() => knowledge.selectedDoc);

function statusColor(s: string) {
  return s === 'INDEXED' ? 'green' : s === 'FAILED' ? 'red' : 'blue';
}

function reparse(id: string) {
  knowledge.update(id, { status: 'PARSING', progress: 50, logs: '重新解析中...' });
}
</script>
