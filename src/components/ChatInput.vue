<template>
  <div class="chat-input flex items-center">
    <a-upload :file-list="fileList" :before-upload="beforeUpload" @remove="onRemove">
      <a-button>
        <template #icon><UploadOutlined /></template>
      </a-button>
    </a-upload>
    <a-input
      v-model:value="text"
      placeholder="Ask a question"
      class="flex-1 mx-2"
      @keydown.enter="onSend"
    />
    <a-button type="primary" @click="onSend">Send</a-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UploadOutlined } from '@ant-design/icons-vue';

const emit = defineEmits<{
  (e: 'send', text: string, files: File[]): void;
}>();

const text = ref('');
const fileList = ref<File[]>([]);

function beforeUpload(file: File) {
  fileList.value.push(file);
  return false; // Prevent default upload behavior
}

function onRemove(file: File) {
  const index = fileList.value.indexOf(file);
  const newFileList = fileList.value.slice();
  newFileList.splice(index, 1);
  fileList.value = newFileList;
}

function onSend() {
  if (!text.value.trim() && fileList.value.length === 0) return;
  emit('send', text.value, fileList.value);
  text.value = '';
  fileList.value = [];
}
</script>

<style scoped>
.chat-input {
  display: flex;
  gap: 0.5rem;
}
</style>
