import { create } from 'zustand';

export const fetchStore = create((set) => ({
  fetch: false,
  setFetch: (fetch) => set({ fetch }),
}));
