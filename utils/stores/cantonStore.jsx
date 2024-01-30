import { create } from 'zustand';

export const cantonStore = create((set) => ({
  canton: '',
  setCanton: (canton) => set({ canton }),
}));
