/** @jsxImportSource react */
import Search from "./Search";
import { useStore } from "@nanostores/react";
import { atom } from "nanostores";

export const MobileMenuState = atom(false);

export default function MobileMenu() {
  const $isMobileMenuOpen = useStore(MobileMenuState);
  return (
    <>
      <div
        className={
          $isMobileMenuOpen
            ? `absolute flex flex-col items-start justify-start -mx-4 w-full mt-1 transform transition-transform duration-300 ease-in-out translate-y-16 z-50 bg-gray-900 shadow shadow-t3-purple-100 opacity-100`
            : `absolute flex flex-col transform items-start justify-start w-full transition-transform duration-300 ease-in-out -translate-y-96 z-50 bg-gray-900 shadow shadow-t3-purple-100 opacity-0`
        }
      >
        <div className="search-item w-full p-2">
          <Search />
        </div>
        <a
          className="inline-flex items-center border font-medium relative text-base px-4 py-2 rounded-md text-white border-transparent hover:text-gray-300"
          href="/en/introduction"
        >
          <span className="">Docs</span>
        </a>
        <a
          className="inline-flex items-center border font-medium relative text-base px-4 py-2 rounded-md text-white border-transparent hover:text-gray-300"
          href="/en/faq"
        >
          <span className="">FAQ</span>
        </a>
        <a
          className="inline-flex items-center border font-medium relative text-base px-4 py-2 rounded-md text-white border-transparent hover:text-gray-300"
          href="https://github.com/t3-oss/create-t3-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="">Github</span>
        </a>
        <a
          className="inline-flex items-center border font-medium relative text-base px-4 py-2 rounded-md text-white border-transparent hover:text-gray-300"
          href="https://init.tips/"
        >
          <span className="">T3 Stack</span>
        </a>
      </div>
    </>
  );
}
