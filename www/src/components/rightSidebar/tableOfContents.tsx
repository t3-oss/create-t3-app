import type { FunctionalComponent } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import type { MarkdownHeading } from "astro";

type ItemOffsets = {
  id: string;
  topOffset: number;
};

const TableOfContents: FunctionalComponent<{ headings: MarkdownHeading[] }> = ({
  headings = [],
}) => {
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
      <h2 className="text-lg my-4 font-semibold">On this page</h2>
      <ul className="w-full border-l-2 border-t3-purple-300 marker:text-t3-purple-300  dark:border-t3-purple-200 my-1">
        <li
          className={`pl-2 marker:bg-t3-purple-300 ${
            activeId === "overview" ? "active" : ""
          }`.trim()}
        >
          <a
            className="text-t3-purple-500 dark:text-t3-purple-200 hover:text-t3-purple-300 "
            href="#overview"
          >
            Overview
          </a>
        </li>
        {headings
          .filter(({ depth }) => depth > 0 && depth < 4)
          .map((heading, i) => {
            const padding = heading.depth + 1;
            return (
              <li key={i} className="w-full list-none pl-2">
                <a
                  className={`pl-${padding} hover:text-t3-purple-300 dark:hover:text-t3-purple-100 text-t3-purple-500 dark:text-t3-purple-200 marker:text-t3-purple-300 ${
                    activeId === heading.slug
                      ? "font-bold text-t3-purple-500 dark:text-t3-purple-200 hover:text-t3-purple-300 dark:hover:text-t3-purple-100"
                      : "text-t3-purple-500 dark:text-t3-purple-200 hover:text-t3-purple-300 dark:hover:text-t3-purple-100"
                  }`}
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
};

export default TableOfContents;
