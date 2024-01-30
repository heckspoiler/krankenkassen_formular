import { create } from 'zustand';

export const datasetStore = create((set) => ({
  dataset: [],
  isLoading: false,
  error: null,
  setDataset: (newDataset) => set({ dataset: newDataset }),
  setIsLoading: (loadingStatus) => set({ isLoading: loadingStatus }),
  setError: (error) => set({ error: error }),
}));
