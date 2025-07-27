<template>
  <a-layout class="h-screen">
    <a-layout-sider width="260">
      <ChatSidebar @rename="handleRename" @delete="handleDelete" />
    </a-layout-sider>

    <a-layout>
      <a-layout-content class="p-4 flex flex-col">
        <router-view />
      </a-layout-content>
    </a-layout>

    <a-layout-sider width="300" theme="light">
      <ContextTabs />
    </a-layout-sider>
  </a-layout>
</template>

<script setup lang="ts">
import ChatSidebar from '@/components/ChatSidebar.vue';
import ContextTabs from '@/components/ContextTabs.vue';
</script>
