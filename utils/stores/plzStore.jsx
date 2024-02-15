import { create } from 'zustand';

export const plzStore = create((set) => ({
  plz: 0,
  setPLZ: (plz) => set({ plz }),
}));
