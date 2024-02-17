import { create } from 'zustand';

export const weiterStore = create((set) => ({
  weiter: false,
  setWeiter: (weiter) => set({ weiter }),
}));
