import { useStore } from "@nanostores/react";
import { sidebarShown, sidebarState } from "../../store/Sidebar";

const SidebarToggle = () => {
  const $isSideBarOpen = useStore(sidebarState);
  return (
    <>
      <button
        type="button"
        aria-pressed={sidebarShown ? "true" : "false"}
        id="menu-toggle"
        className="dark:text-slate-50"
        onClick={() => {
          sidebarState.set(!$isSideBarOpen);
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
        <span className="sr-only">Toggle sidebar</span>
      </button>
    </>
  );
};

export default SidebarToggle;
