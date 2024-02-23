import { create } from 'zustand';

export const offerStore = create((set) => ({
  versicherung: "",
  praemie: "",
  tarif: "",
  setOffer: (versicherung, praemie, tarif) => set({versicherung, praemie, tarif }),
}));
