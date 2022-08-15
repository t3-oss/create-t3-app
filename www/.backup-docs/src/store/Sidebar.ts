import { atom } from "nanostores";

export const sidebarState = atom(false);

export const openSidebar = () => {
  sidebarState.set(true);
};

export const closeSidebar = () => {
  sidebarState.set(false);
};

export const sidebarShown = () => sidebarState.get();
