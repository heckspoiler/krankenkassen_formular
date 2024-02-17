import { create } from 'zustand';

export const formStore = create((set) => ({
  surname: '',
  setSurname: (surname) => set({ surname }),
  firstname: '',
  setFirstname: (firstname) => set({ firstname }),
  email: '',
  setEmail: (email) => set({ email }),
  birthday: '',
  setBirthday: (birthday) => set({ birthday }),
  phone: '',
  setPhone: (phone) => set({ phone }),
  text: '',
  setText: (text) => set({ text }),
}));
