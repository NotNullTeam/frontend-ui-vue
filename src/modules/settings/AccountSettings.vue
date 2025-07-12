<template>
  <div class="p-4 space-y-4">
    <div class="flex items-center space-x-3">
      <a-avatar :src="user.avatar" size="large" />
      <div>
        <div>{{ user.name }}</div>
        <div class="text-gray-500 text-sm">{{ user.dept }}</div>
      </div>
    </div>

    <a-form>
      <a-form-item label="修改密码">
        <a-input-password v-model:value="password" placeholder="新密码" style="width:200px" />
      </a-form-item>
    </a-form>

    <a-button danger @click="onLogout">退出登录</a-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const user = useUserStore();
const router = useRouter();
const password = ref('');

function onLogout() {
  user.logout();
  router.push('/');
}
</script>
