<template>
  <div class="flex-1 overflow-auto mb-2">
    <div v-for="(m, idx) in messages" :key="idx" class="mb-1">
      <strong>{{ m.role }}:</strong>
      <span>{{ m.text }}{{ m.answer }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Msg { role: string; text?: string; answer?: string }

defineProps<{ messages: Msg[] }>();
</script>
