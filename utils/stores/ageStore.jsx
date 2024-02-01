import { create } from 'zustand';

export const ageStore = create((set) => ({
  age: 'AKL-KIN',
  setAge: (age) => set({ age }),
}));
