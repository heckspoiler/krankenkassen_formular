import { create } from 'zustand';

export const cantonStore = create((set) => ({
  canton: 'AG',
  setCanton: (canton) => set({ canton }),
}));
