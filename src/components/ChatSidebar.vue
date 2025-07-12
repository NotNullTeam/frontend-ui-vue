<template>
  <div class="h-full flex flex-col" :class="{ 'items-center': collapsed }">
    <!-- top -->
    <div class="p-2 w-full flex flex-col items-center gap-2">
      <a-avatar size="large" :src="user.avatar" class="cursor-pointer" @click="router.push('/settings/account')" />
      <a-button
        type="primary"
        block
        class="mt-2"
        v-if="!collapsed"
        @click="showNew = true"
      >
        新诊断
      </a-button>
      <div class="w-full flex gap-1" v-if="!collapsed">
        <a-button @click="showFilter = true">过滤</a-button>
        <a-input-search v-model:value="search" placeholder="搜索历史" />
      </div>
    </div>

    <!-- history list -->
    <a-list
      v-if="!collapsed"
      size="small"
      :data-source="filtered"
      class="flex-1 overflow-auto px-2"
    >
      <template #renderItem="{ item }">
        <a-dropdown :trigger="['contextmenu']">
          <template #overlay>
            <a-menu>
              <a-menu-item key="rename" @click="rename(item)">重命名</a-menu-item>
              <a-menu-item key="delete" danger @click="del(item)">删除</a-menu-item>
            </a-menu>
          </template>
          <a-list-item @click="select(item)">
            <a-tag :color="item.status === 'success' ? 'green' : 'blue'">{{ item.status }}</a-tag>
            <span class="mx-1">{{ item.title }}</span>
            <span class="text-gray-400 text-xs">{{ item.time }}</span>
          </a-list-item>
        </a-dropdown>
      </template>
    </a-list>

    <!-- bottom menu -->
    <a-menu
      mode="inline"
      :inline-collapsed="collapsed"
      class="w-full"
      v-model:selectedKeys="selectedKeys"
    >
      <a-menu-item key="dashboard" icon="dashboard" @click="router.push('/dashboard')">数据看板</a-menu-item>
      <a-menu-item key="kb" icon="book" @click="router.push('/knowledge')">知识库</a-menu-item>
      <a-menu-item key="settings" icon="setting" @click="router.push('/settings/system')">系统设置</a-menu-item>
      <a-menu-item key="toggle" @click="collapsed = !collapsed" icon="menu-fold">
        {{ collapsed ? '展开' : '折叠' }}
      </a-menu-item>
    </a-menu>

    <!-- filter modal -->
    <a-modal v-model:open="showFilter" title="过滤条件" @ok="showFilter = false">
      <a-form>
        <a-form-item label="设备品牌">
          <a-select placeholder="全部" />
        </a-form-item>
        <a-form-item label="问题类型">
          <a-select placeholder="全部" />
        </a-form-item>
        <a-form-item label="附件类型">
          <a-select placeholder="全部" />
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- new diagnosis modal -->
    <a-modal v-model:open="showNew" title="发起新诊断" @ok="startNew">
      <a-form>
        <a-form-item label="问题标题">
          <a-input v-model:value="newTitle" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, h, computed } from 'vue';
import { message, Modal } from 'ant-design-vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';

interface HistoryItem {
  status: string;
  title: string;
  time: string;
}

const collapsed = ref(false);
const showFilter = ref(false);
const showNew = ref(false);
const newTitle = ref('');
const search = ref('');
const selectedKeys = ref<string[]>([]);
const history = ref<HistoryItem[]>([
  { status: 'success', title: '诊断会话 1', time: '2024-01-01' },
  { status: 'running', title: '诊断会话 2', time: '2024-01-02' },
]);
const filtered = computed(() =>
  history.value.filter((h) => h.title.includes(search.value))
);
const router = useRouter();
const route = useRoute();
const user = useUserStore();

function select(_item: HistoryItem) {
  router.push('/chat');
}

function rename(item: HistoryItem) {
  Modal.confirm({
    title: '重命名',
    content: () =>
      h('input', {
        value: item.title,
        onInput: (e: any) => (item.title = e.target.value),
      }),
    onOk: () => message.success('已重命名'),
  });
}

function del(item: HistoryItem) {
  Modal.confirm({
    title: '确认删除?',
    onOk: () => {
      history.value = history.value.filter((h) => h !== item);
      message.success('已删除');
    },
  });
}

function startNew() {
  if (!newTitle.value.trim()) {
    message.warning('请输入标题');
    return;
  }
  const item: HistoryItem = {
    status: 'running',
    title: newTitle.value,
    time: new Date().toLocaleString(),
  };
  history.value.unshift(item);
  newTitle.value = '';
  showNew.value = false;
  select(item);
}

watch(
  () => route.path,
  (p) => {
    if (p.startsWith('/dashboard')) selectedKeys.value = ['dashboard'];
    else if (p.startsWith('/knowledge')) selectedKeys.value = ['kb'];
    else if (p.startsWith('/settings')) selectedKeys.value = ['settings'];
    else selectedKeys.value = [];
  },
  { immediate: true }
);
</script>
