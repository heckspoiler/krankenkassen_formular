import { create } from 'zustand';

export const addMoreStore = create((set) => ({
  addMore: false,
  setAddMore: (addMore) => set({ addMore }),
}));
