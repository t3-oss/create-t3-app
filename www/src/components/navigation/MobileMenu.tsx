/** @jsxImportSource react */
import Search from "./Search";
import { useStore } from "@nanostores/react";
import { atom } from "nanostores";
import clsx from "clsx";

export const MobileMenuState = atom(false);

const NavLink: React.FC<{
  href: string;
  title: string;
  external?: boolean;
}> = ({ href, title, external = false }) => (
  <a
    href={href}
    className="relative inline-flex items-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white hover:text-gray-300"
    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
  >
    {title}
  </a>
);

export default function MobileMenu() {
  const $isMobileMenuOpen = useStore(MobileMenuState);
  return (
    <>
      <div
        className={clsx(
          "bg-default shadow-t3-purple-100 absolute z-50 mt-1 flex transform flex-col shadow transition-transform duration-300 ease-in-out",
          {
            "-mx-4 mt-1 translate-y-16 opacity-100": $isMobileMenuOpen,
            "-translate-y-96 opacity-0": !$isMobileMenuOpen,
          },
        )}
      >
        <div className="search-item w-full p-2">
          <Search />
        </div>
        <NavLink href="/en/introduction" title="Docs" />
        <NavLink href="/en/faq" title="FAQ" />
        <NavLink
          href="https://github.com/t3-oss/create-t3-app"
          title="GitHub"
          external
        />
        <NavLink href="https://init.tips" title="T3 Stack" external />
      </div>
    </>
  );
}
