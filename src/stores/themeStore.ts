import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  theme: string | number;
  setTheme: (theme: string | number) => void;
  shirt: string | number;
  setShirt: (shirt: string | number) => void;
  st: string | number;
  setSt: (st: string | number) => void;
}

export const themeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 1,
      setTheme: (theme) => set({ theme }),
      shirt: 1,
      setShirt: (shirt) => set({ shirt }),
      st: 1,
      setSt: (st) => set({ st }),
    }),
    {
      name: "theme-storage",
    },
  ),
);
