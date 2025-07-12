<template>
    <a-layout class="h-screen">
      <a-layout-sider width="260">
        <ChatSidebar />
      </a-layout-sider>
  
      <a-layout>
        <a-layout-content class="p-4 flex flex-col">
          <a-tabs v-model:activeKey="tab" class="flex-1 flex flex-col">
            <a-tab-pane key="dashboard" tab="数据看板" class="h-full">
              <DashboardView class="h-full" />
            </a-tab-pane>
            <a-tab-pane key="diag" tab="诊断路径" class="h-full">
              <div class="flex flex-col h-full">
                <div class="flex-1 mb-2 border rounded">
                  <DiagnosisGraph />
                </div>
                <MessageList :messages="messages" class="mb-2 flex-1 overflow-auto" />
                <ChatInput @send="handleSend" />
              </div>
            </a-tab-pane>
          </a-tabs>
        </a-layout-content>
      </a-layout>
  
      <a-layout-sider width="300" theme="light">
        <ContextTabs />
      </a-layout-sider>
    </a-layout>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import ChatSidebar from '@/components/ChatSidebar.vue';
  import ContextTabs from '@/components/ContextTabs.vue';
  import DiagnosisGraph from '@/components/DiagnosisGraph.vue';
  import MessageList from '@/components/MessageList.vue';
  import ChatInput from '@/components/ChatInput.vue';
  import DashboardView from '@/components/DashboardView.vue';
  import { useChatStore } from '@/stores/chat';
  import { useGraphStore } from '@/stores/graph';
  
  interface Msg { role: string; text?: string; answer?: string }
  
  const { send } = useChatStore();
  const graph = useGraphStore();
  const messages = ref<Msg[]>([]);
  const tab = ref('dashboard');
  
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
  
  async function handleSend(text: string, files: File[]) {
    messages.value.push({ role: 'user', text });
    addStep('USER_QUERY', text);
    await send(text, files, (token) => {
      const last = messages.value[messages.value.length - 1];
      last.answer = (last.answer ?? '') + token;
    });
    addStep('AI_ANALYSIS', 'AI 分析中...');
  }
  </script>
