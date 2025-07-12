const BASE = import.meta.env.VITE_API_BASE;
export const api = (url: string, opts?: RequestInit) =>
  fetch(`${BASE}${url}`, opts);
