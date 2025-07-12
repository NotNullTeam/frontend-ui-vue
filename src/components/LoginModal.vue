<template>
  <a-modal :open="!user.loggedIn" title="登录" :closable="false" footer="null">
    <a-form @submit.prevent>
      <a-form-item>
        <a-input v-model:value="username" placeholder="用户名" />
      </a-form-item>
      <a-form-item>
        <a-input-password v-model:value="password" placeholder="密码" />
      </a-form-item>
      <div class="text-right">
        <a-button type="primary" @click="onLogin">登录</a-button>
      </div>
      <a-alert v-if="error" :message="error" type="error" show-icon class="mt-2" />
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';

const user = useUserStore();
const username = ref('');
const password = ref('');
const error = ref('');

function onLogin() {
  if (!user.login(username.value, password.value)) {
    error.value = '用户名或密码错误';
  } else {
    error.value = '';
  }
}
</script>
