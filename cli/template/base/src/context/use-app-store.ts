import { create } from "zustand";

export interface AppStore {
  menuIsOpen: boolean;
  setMenuIsOpen: (menuIsOpen: boolean) => void;
  showHeader: boolean;
  setShowHeader: (showHeader: boolean) => void;
  flatLogo: boolean;
  setFlatLogo: (flatLogo: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  menuIsOpen: false,
  setMenuIsOpen: (menuIsOpen: boolean) => set((s) => ({ ...s, menuIsOpen })),
  showHeader: true,
  setShowHeader: (showHeader: boolean) => set((s) => ({ ...s, showHeader })),
  flatLogo: false,
  setFlatLogo: (flatLogo: boolean) => set((s) => ({ ...s, flatLogo })),
}));
