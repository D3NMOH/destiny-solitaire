import { create } from "zustand";

interface ShowState {
  showThemesPanel: boolean;
  setShowThemesPanel: (isShow: boolean) => void;
  showLangPanel: boolean;
  setShowLangPanel: (isShow: boolean) => void;
  showShirtPanel: boolean;
  setShowShirtPanel: (isShow: boolean) => void;
  showSuitPanel: boolean;
  setShowSuitPanel: (isShow: boolean) => void;
}

export const showPanelStore = create<ShowState>((set) => ({
  showThemesPanel: false,
  setShowThemesPanel: (isShow) => set({ showThemesPanel: isShow }),
  showLangPanel: false,
  setShowLangPanel: (isShow) => set({ showLangPanel: isShow }),
  showShirtPanel: false,
  setShowShirtPanel: (isShow) => set({ showShirtPanel: isShow }),
  showSuitPanel: false,
  setShowSuitPanel: (isShow) => set({ showSuitPanel: isShow }),
}));
