import type { MarkdownHeading } from "astro";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

type ItemOffsets = {
  id: string;
  topOffset: number;
};

/** FIXME: SIMPLIFY THIS PLS */
export default function TableOfContents({
  headings = [],
}: {
  headings: MarkdownHeading[];
}) {
  const itemOffsets = useRef<ItemOffsets[]>([]);
  const [activeId, setActiveId] = useState<string | undefined>(undefined);
  useEffect(() => {
    const getItemOffsets = () => {
      const titles = document.querySelectorAll("article :is(h1, h2, h3, h4)");
      if (itemOffsets && itemOffsets.current) {
        itemOffsets.current = Array.from(titles).map((title) => {
          return {
            id: title.id,
            topOffset: title.getBoundingClientRect().top + window.scrollY,
          };
        }) as ItemOffsets[];
      }
    };

    getItemOffsets();
    window.addEventListener("resize", getItemOffsets);

    return () => {
      window.removeEventListener("resize", getItemOffsets);
    };
  }, []);

  useEffect(() => {
    setActiveId(window.location.hash.slice(1));
    const updateActiveId = (slug: string) => {
      setActiveId(slug);
    };
    window.addEventListener("hashchange", () =>
      updateActiveId(window.location.hash.slice(1)),
    );
    return () => {
      window.removeEventListener("hashchange", () =>
        updateActiveId(window.location.hash.slice(1)),
      );
    };
  }, []);

  return (
    <div className="w-full ">
      <h2 className="text-lg my-4 font-semibold dark:text-white text-slate-900">
        On this page
      </h2>
      <ul className="w-full border-l-2 border-t3-purple-300 marker:text-t3-purple-300  dark:border-t3-purple-200 my-1 list-none">
        <li
          className={clsx([
            "pl-1 ml-1 list-none",
            activeId === "overview" ? "font-bold" : "font-normal",
          ])}
        >
          <a
            className="hover:text-t3-purple-700 dark:hover:text-t3-purple-100 text-t3-purple-500 dark:text-t3-purple-200 text-base"
            href="#overview"
          >
            Overview
          </a>
        </li>
        {headings
          .filter(({ depth }) => depth > 0 && depth < 4)
          .map((heading, i) => {
            const padding = heading.depth;
            return (
              <li key={i} className={`pl-${padding} ml-1 w-full list-none`}>
                <a
                  className={clsx([
                    "hover:text-t3-purple-700 dark:hover:text-t3-purple-100 text-t3-purple-500 dark:text-t3-purple-200",
                    activeId === heading.slug ? "font-bold" : "font-normal",
                    padding < 3 ? "text-base" : "text-sm",
                  ])}
                  href={`#${heading.slug}`}
                >
                  {heading.text}
                </a>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
