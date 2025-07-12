<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import LoginModal from '@/components/LoginModal.vue';

const user = useUserStore();
</script>

<template>
  <router-view />
  <LoginModal v-if="!user.loggedIn" />
</template>

<style scoped>
</style>
