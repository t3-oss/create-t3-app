import { useState } from "react";

export function IntroductionTab() {
  const [isAppRouterSelected, setIsAppRouterSelected] = useState(true);
  return (
    <>
      <div className="flex w-full justify-center gap-10 py-5">
        <button
          className={`${isAppRouterSelected ? "bg-primary text-white" : "bg-transparent"} inline-flex cursor-pointer items-center rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-500 hover:no-underline md:px-5 md:text-base lg:px-4 lg:py-3`}
          onClick={() => setIsAppRouterSelected(true)}
        >
          App Router
        </button>
        <button
          className={`${!isAppRouterSelected ? "bg-primary text-white" : "bg-transparent"} inline-flex cursor-pointer items-center rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-500 hover:no-underline md:px-5 md:text-base lg:px-4 lg:py-3`}
          onClick={() => setIsAppRouterSelected(false)}
        >
          {" "}
          Pages Router
        </button>
      </div>
      <div className="embed">
        <iframe
          width="560"
          height="315"
          src={
            isAppRouterSelected
              ? "https://www.youtube.com/embed/d5x0JCZbAJs"
              : "https://www.youtube.com/embed/YkOSUVzOAA4"
          }
          title="The best stack for your next project"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </div>
    </>
  );
}
