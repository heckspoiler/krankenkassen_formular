import { create } from 'zustand';

export const ageStore = create((set) => ({
  age: 'AKL-ERW',
  setAge: (age) => set({ age }),
}));
