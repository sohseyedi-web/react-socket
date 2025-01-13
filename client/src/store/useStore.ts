import { create } from "zustand";

type ResponsiveState = {
  active: boolean;
  setActive: (active: boolean) => void;
  updateMedia: () => void;
};

export const useResponsiveStore = create<ResponsiveState>((set) => ({
  active: typeof window !== "undefined" ? window.innerWidth > 1024 : false,
  setActive: (active) => set({ active }),
  updateMedia: () => set({ active: window.innerWidth > 1024 }),
}));
