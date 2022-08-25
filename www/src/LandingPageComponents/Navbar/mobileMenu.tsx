/* eslint-disable unicorn/filename-case */
/** @jsxImportSource react */
import { useStore } from "@nanostores/react";
import { MobileMenuState } from "../../stores/mobileMenu";

const MobileMenu = () => {
  const $isMobileMenuOpen = useStore(MobileMenuState);
  return (
    <>
      <div
        className={
          $isMobileMenuOpen
            ? `absolute flex flex-col items-start justify-start -mx-4 w-full mt-1 transform transition-transform duration-300 ease-in-out translate-y-16 z-50 bg-gray-900 shadow shadow-t3-purple-100`
            : `absolute flex flex-col transform items-start justify-start w-full transition-transform duration-300 ease-in-out -translate-y-48 z-50 bg-gray-900 shadow shadow-t3-purple-100 `
        }
      >
        <a
          className="inline-flex items-center border font-medium relative text-base px-4 py-2 rounded-md text-white border-transparent hover:text-gray-300"
          href="/"
        >
          <span className="">Docs</span>
        </a>
        <a
          className="inline-flex items-center border font-medium relative text-base px-4 py-2 rounded-md text-white border-transparent hover:text-gray-300"
          href="/"
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
};

export default MobileMenu;
