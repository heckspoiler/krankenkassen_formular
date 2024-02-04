import { create } from 'zustand';

export const cantonRadioStore = create((set) => ({
  cantonRadio: 'Ja',
  setCantonRadio: (cantonRadio) => set({ cantonRadio }),
}));
