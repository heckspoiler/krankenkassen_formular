import { create } from 'zustand';

export const franchiseStore = create((set) => ({
  franchise: 'FRA-300',
  setFranchise: (franchise) => set({ franchise }),
}));
