/** @jsxImportSource react */
import { useStore } from "@nanostores/react";
import { MobileMenuState } from "./MobileMenu";

export default function MobileMenuButton() {
  const $isMobileMenuOpen = useStore(MobileMenuState);
  return (
    <>
      <button
        type="button"
        aria-pressed={$isMobileMenuOpen ? "true" : "false"}
        className="dark:text-slate-50 block md:hidden"
        onClick={() => {
          MobileMenuState.set(!$isMobileMenuOpen);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <span className="sr-only ">Toggle Mobile Menu</span>
      </button>
    </>
  );
}
