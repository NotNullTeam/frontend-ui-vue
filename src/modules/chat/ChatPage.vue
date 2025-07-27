<template>
  <div class="flex-1 mb-2 border rounded">
    <DiagnosisGraph />
  </div>
  <MessageList :messages="messages" class="mb-2" />
  <ChatInput @send="handleSend" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ChatInput from '@/components/ChatInput.vue';
import MessageList from '@/components/MessageList.vue';
import DiagnosisGraph from '@/components/DiagnosisGraph.vue';
import { useChatStore } from '@/stores/chat';
import { useGraphStore } from '@/stores/graph';
import { message } from 'ant-design-vue';

interface Msg { role: string; text?: string; answer?: string }

const { send } = useChatStore();
import { useHistoryStore } from '@/stores/history';

const historyStore = useHistoryStore();
const messages = ref<Msg[]>([]);
const graph = useGraphStore();

function addStep(type: string, name: string) {
  const id = `${type}-${Date.now()}`;
  graph.addNode({ id, type, status: 'COMPLETED', name });
  if (graph.nodes.length > 1) {
    const prev = graph.nodes[graph.nodes.length - 2].id;
    graph.addEdge({ source: prev, target: id });
  }
  graph.selectNode(id);
  return id;
}

function handleRename(item: any, title: string) {
  item.title = title;
  message.success('已重命名');
}

function handleDelete(item: any) {
  historyStore.remove(item.id);
  message.success('已删除');
}

async function handleSend(text: string, files: File[]) {
  const item = {
    id: Date.now().toString(),
    status: 'running',
    title: text,
    time: new Date().toLocaleString(),
  };
  historyStore.add(item);
  messages.value.push({ role: 'user', text });
  addStep('USER_QUERY', text);
  await send(text, files, (token) => {
    const last = messages.value[messages.value.length - 1];
    last.answer = (last.answer ?? '') + token;
  });
  addStep('AI_ANALYSIS', 'AI 分析中...');
}
</script>
