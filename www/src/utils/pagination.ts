import { SIDEBAR, Sidebar, SidebarItem, SidebarItemLink } from "../config";

export function paginate(lang: keyof Sidebar, path: SidebarItemLink) {
  const routes = Object.values(SIDEBAR[lang]).flat() as SidebarItem[];
  const index = routes.map((item) => item.link).indexOf(path);
  if (index === -1) return { prev: undefined, next: undefined };
  const prev = index > 0 ? routes[index - 1] : undefined;
  const next = index < routes.length - 1 ? routes[index + 1] : undefined;
  return { prev, next };
}
