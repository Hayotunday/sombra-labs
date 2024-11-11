import { create } from "zustand";

const useScrollStore = create((set) => ({
  scrollId:  0,
  setScrollId: (id) => set({ id}),
}));

export default useScrollStore;
