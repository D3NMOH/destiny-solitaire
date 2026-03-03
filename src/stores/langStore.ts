import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LangState {
  language: string | number;
  setLanguage: (language: string | number) => void;
}

export const langStore = create<LangState>()(
  persist(
    (set) => ({
      language: "en",
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "lang-storage",
    },
  ),
);
