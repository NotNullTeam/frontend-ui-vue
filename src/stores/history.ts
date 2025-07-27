import { defineStore } from 'pinia';

export interface HistoryItem {
  id: string;
  status: string;
  title: string;
  time: string;
}

export const useHistoryStore = defineStore('history', {
  state: () => ({
    history: [] as HistoryItem[],
  }),
  actions: {
    add(item: HistoryItem) {
      this.history.unshift(item);
    },
    rename(id: string, title: string) {
      const item = this.history.find((h) => h.id === id);
      if (item) {
        item.title = title;
      }
    },
    remove(id: string) {
      this.history = this.history.filter((h) => h.id !== id);
    },
  },
});
