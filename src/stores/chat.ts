import { defineStore } from 'pinia';
import { api } from '@/services/http';

export const useChatStore = defineStore('chat', () => {
  async function send(text: string, _files: File[], onToken: (token: string) => void) {
    const res = await api('/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: text })
    });
    const reader = res.body?.getReader();
    if (!reader) return;
    const decoder = new TextDecoder();
    let buffer = '';
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split(/\r?\n/);
      buffer = lines.pop() ?? '';
      for (const line of lines) {
        if (line.startsWith('data:')) {
          try {
            const { token } = JSON.parse(line.slice(5));
            onToken(token);
          } catch {
            /* ignore */
          }
        }
      }
    }
  }

  return { send };
});
