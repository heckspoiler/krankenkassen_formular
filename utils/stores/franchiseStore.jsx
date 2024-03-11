import { create } from 'zustand';

export const franchiseStore = create((set) => ({
  franchise: 'FRAST1',
  setFranchise: (franchise) => set({ franchise }),
}));
