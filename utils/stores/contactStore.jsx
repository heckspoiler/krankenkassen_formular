import { create } from 'zustand';

export const contactFormStore = create((set) => ({
  showForm: false,
  setShowForm: (showForm) => set({ showForm }),
}));
