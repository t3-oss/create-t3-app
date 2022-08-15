import { useState, useEffect, useRef } from "react";
import { MarkdownHeading } from "astro";
import { itemHash } from "../../store/itemHash";
import { useStore } from "@nanostores/react";

const TableOfContents = ({ headings }: { headings: MarkdownHeading[] }) => {
  const itemOffsets = useRef([]);
  const [activeId, setActiveId] = useState<string>(undefined);
  useEffect(() => {
    const getItemOffsets = () => {
      const titles = document.querySelectorAll("article :is(h1, h2, h3, h4)");
      itemOffsets.current = Array.from(titles).map((title) => ({
        id: title.id,
        topOffset: title.getBoundingClientRect().top + window.scrollY,
      }));
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
    <div className="w-full">
      <h2 className="text-lg my-4 font-semibold">On this page</h2>
      <ul className="w-full border-l-2 border-slate-800 dark:border-brand-primary my-1">
        <li
          className={`pl-2 ${activeId === "overview" ? "active" : ""}`.trim()}
        >
          <a href="#overview">Overview</a>
        </li>
        {headings
          .filter(({ depth }) => depth > 0 && depth < 4)
          .map((heading, i) => {
            const padding = heading.depth + 1;
            return (
              <li
                key={i}
                className={`w-full list-none  ${
                  activeId === heading.slug ? "font-semibold" : ""
                }`}
              >
                <a className={`pl-${padding}`} href={`#${heading.slug}`}>
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
