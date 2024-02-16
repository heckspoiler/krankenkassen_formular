import { create } from 'zustand';

export const regionStore = create((set) => ({
  region: '',
  setRegion: (region) => set({ region }),
}));
