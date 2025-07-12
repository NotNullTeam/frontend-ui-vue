<template>
  <div class="h-full flex flex-col">
    <div class="mb-2 flex flex-wrap gap-2 items-center">
      <a-button type="primary" @click="showUpload = true">
        <template #icon><UploadOutlined /></template>上传文档
      </a-button>
      <a-select v-model:value="statusFilter" style="width: 150px" placeholder="状态">
        <a-select-option value="">全部</a-select-option>
        <a-select-option value="UPLOADING">UPLOADING</a-select-option>
        <a-select-option value="PARSING">PARSING</a-select-option>
        <a-select-option value="INDEXED">INDEXED</a-select-option>
        <a-select-option value="FAILED">FAILED</a-select-option>
      </a-select>
      <a-select
        v-model:value="vendorFilter"
        mode="multiple"
        style="width: 200px"
        placeholder="Vendor"
      >
        <a-select-option value="Huawei">Huawei</a-select-option>
        <a-select-option value="Cisco">Cisco</a-select-option>
        <a-select-option value="Juniper">Juniper</a-select-option>
        <a-select-option value="Other">Other</a-select-option>
      </a-select>
    </div>

    <a-table
      :data-source="filtered"
      :pagination="false"
      row-key="id"
      class="flex-1 overflow-auto"
    >
      <a-table-column title="文件名" data-index="name" key="name" />
      <a-table-column title="Vendor" data-index="vendor" key="vendor" />
      <a-table-column title="标签" key="tags">
        <template #default="{ record }">
          <a-tag v-for="t in record.tags" :key="t" class="mr-1">{{ t }}</a-tag>
        </template>
      </a-table-column>
      <a-table-column title="上传时间" data-index="time" key="time" />
      <a-table-column title="状态" key="status">
        <template #default="{ record }">
          <a-progress
            v-if="record.status === 'PARSING'"
            :percent="record.progress"
            size="small"
          />
          <a-tag v-else :color="statusColor(record.status)">{{ record.status }}</a-tag>
        </template>
      </a-table-column>
      <a-table-column title="操作" key="action" width="120">
        <template #default="{ record }">
          <a-button type="link" @click="view(record.id)">查看详情</a-button>
          <a-button type="link" danger @click="del(record.id)">删除</a-button>
        </template>
      </a-table-column>
    </a-table>

    <a-empty v-if="filtered.length === 0" class="flex-1 flex items-center justify-center" />

    <a-modal v-model:open="showUpload" title="上传文档" @ok="startUpload" @cancel="showUpload = false">
      <a-upload-dragger multiple :before-upload="beforeUpload" :file-list="fileList" @remove="onRemove">
        <p class="ant-upload-drag-icon"><InboxOutlined /></p>
        <p class="ant-upload-text">点击或拖拽上传</p>
      </a-upload-dragger>
      <a-form class="mt-2">
        <a-form-item label="Vendor">
          <a-select v-model:value="uploadVendor" style="width: 200px">
            <a-select-option value="Huawei">Huawei</a-select-option>
            <a-select-option value="Cisco">Cisco</a-select-option>
            <a-select-option value="Juniper">Juniper</a-select-option>
            <a-select-option value="Other">Other</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Tags">
          <a-select v-model:value="uploadTags" mode="tags" style="width: 200px" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { message, Modal } from 'ant-design-vue';
import { useKnowledgeStore, type DocumentItem } from '@/stores/knowledge';

const store = useKnowledgeStore();

const showUpload = ref(false);
const fileList = ref<any[]>([]);
const uploadVendor = ref('Huawei');
const uploadTags = ref<string[]>([]);
const statusFilter = ref('');
const vendorFilter = ref<string[]>([]);

function beforeUpload(file: File) {
  fileList.value.push(file);
  return false;
}
function onRemove(file: any) {
  fileList.value = fileList.value.filter((f) => f !== file);
}
function startUpload() {
  showUpload.value = false;
  fileList.value.forEach((file) => {
    const id = `${Date.now()}-${file.name}`;
    const doc: DocumentItem = {
      id,
      name: file.name,
      vendor: uploadVendor.value,
      tags: [...uploadTags.value],
      time: new Date().toLocaleString(),
      status: 'INDEXED',
      progress: 100,
    };
    store.add(doc);
  });
  fileList.value = [];
  uploadTags.value = [];
  message.success('上传成功');
}
function view(id: string) {
  store.select(id);
}
function del(id: string) {
  Modal.confirm({
    title: '确认删除?',
    onOk: () => store.remove(id),
  });
}
const filtered = computed(() => {
  return store.docs.filter((d) => {
    if (statusFilter.value && d.status !== statusFilter.value) return false;
    if (vendorFilter.value.length && !vendorFilter.value.includes(d.vendor)) return false;
    return true;
  });
});
function statusColor(s: string) {
  return s === 'INDEXED'
    ? 'green'
    : s === 'FAILED'
      ? 'red'
      : 'blue';
}
</script>
