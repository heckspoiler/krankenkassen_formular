import { create } from 'zustand';

export const addMoreStore = create((set) => ({
  addMore: '0',
  setAddMore: (addMore) => set({ addMore }),
}));
