<template>
  <div class="chat-input">
    <a-input
      v-model:value="text"
      placeholder="Ask a question"
      class="mr-2"
      @keydown.enter="onSend"
    />
    <a-button type="primary" @click="onSend">Send</a-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'send', text: string, files: File[]): void;
}>();

const text = ref('');

function onSend() {
  if (!text.value.trim()) return;
  emit('send', text.value, []);
  text.value = '';
}
</script>

<style scoped>
.chat-input {
  display: flex;
  gap: 0.5rem;
}
</style>
