/** @jsxImportSource react */
import clsx from "clsx";
import { useRef } from "react";

export default function SidebarToggle({
  currentPage,
}: {
  currentPage: string;
}) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const isLanding = currentPage === "/";

  const handleClick = () => {
    const body = document.querySelector("body")!;
    if (body.classList.contains("mobile-sidebar-toggle")) {
      ref.current?.setAttribute("aria-pressed", "false");
      body.classList.remove("mobile-sidebar-toggle");
    } else {
      ref.current?.setAttribute("aria-pressed", "true");
      body.classList.add("mobile-sidebar-toggle");
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      aria-pressed="false"
      onClick={handleClick}
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
}
