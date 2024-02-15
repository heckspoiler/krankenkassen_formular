import { create } from 'zustand';

export const regionStore = create((set) => ({
  region: 0,
  setRegion: (region) => set({ region }),
}));
