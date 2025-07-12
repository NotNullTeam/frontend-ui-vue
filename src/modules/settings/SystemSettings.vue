<template>
  <div class="p-4 space-y-4">
    <a-form>
      <a-form-item label="外观">
        <a-select v-model:value="theme" style="width: 200px">
          <a-select-option value="light">浅色</a-select-option>
          <a-select-option value="dark">深色</a-select-option>
          <a-select-option value="system">跟随系统</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="通知">
        <a-checkbox-group v-model:value="notifies" :options="notifyOptions" />
      </a-form-item>
      <a-form-item label="API密钥">
        <a-input-password v-model:value="apiKey" placeholder="输入密钥" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const theme = ref('light');
const notifies = ref<string[]>([]);
const apiKey = ref('');
const notifyOptions = ['消息', '更新', '警告'];
</script>
