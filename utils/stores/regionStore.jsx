import { create } from 'zustand';

export const regionStore = create((set) => ({
  region: 'PR-REG CH0',
  setRegion: (region) => set({ region }),
}));
