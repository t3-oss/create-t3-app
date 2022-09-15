/** @jsxImportSource react */
import clsx from "clsx";
import { useState } from "react";

const SidebarToggle: React.FC<{ currentPage: string }> = ({ currentPage }) => {
  const [sidebarShown, setSidebarShown] = useState(false);

  const isLanding = currentPage === "/";

  return (
    <button
      type="button"
      aria-pressed={sidebarShown ? "true" : "false"}
      onClick={() => setSidebarShown(!sidebarShown)}
      className={clsx("z-20 block md:hidden", {
        "text-white": isLanding,
        "text-black dark:text-white": !isLanding,
      })}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 stroke-current fill-transparent"
        viewBox="0 0 24 24"
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
  );
};

export default SidebarToggle;
