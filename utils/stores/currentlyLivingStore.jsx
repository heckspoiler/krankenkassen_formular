import { create } from 'zustand';

export const currentlyLivingStore = create((set) => ({
  currentlyLiving: 'Ja',
  setCurrentlyLiving: (currentlyLiving) => set({ currentlyLiving }),
}));
