import { defineStore } from 'pinia';

export type DocStatus = 'UPLOADING' | 'PARSING' | 'INDEXED' | 'FAILED';

export interface DocumentItem {
  id: string;
  name: string;
  vendor: string;
  tags: string[];
  time: string;
  status: DocStatus;
  progress: number;
  logs?: string;
}

export const useKnowledgeStore = defineStore('knowledge', {
  state: () => ({
    docs: [] as DocumentItem[],
    selectedId: null as string | null,
  }),
  getters: {
    selectedDoc(state) {
      return state.docs.find((d) => d.id === state.selectedId) || null;
    },
  },
  actions: {
    add(doc: DocumentItem) {
      this.docs.push(doc);
    },
    update(id: string, patch: Partial<DocumentItem>) {
      const d = this.docs.find((i) => i.id === id);
      if (d) Object.assign(d, patch);
    },
    remove(id: string) {
      this.docs = this.docs.filter((d) => d.id !== id);
    },
    select(id: string | null) {
      this.selectedId = id;
    },
  },
});
