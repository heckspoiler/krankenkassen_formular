import { create } from 'zustand';

export const accidentStore = create((set) => ({
  accident: 'MIT-UNF',
  setAccident: (accident) => set({ accident }),
}));
