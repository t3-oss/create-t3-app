import { create } from "zustand";

export interface AppStore {
  menuIsOpen: boolean;
  setMenuIsOpen: (menuIsOpen: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  menuIsOpen: false,
  setMenuIsOpen: (menuIsOpen: boolean) => set((s) => ({ ...s, menuIsOpen })),
}));
