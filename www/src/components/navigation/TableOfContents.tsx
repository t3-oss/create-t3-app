import type { MarkdownHeading } from "astro";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

interface TOCProps {
  headings: MarkdownHeading[];
}

export default function TableOfContents({ headings = [] }: TOCProps) {
  headings = [
    { depth: 2, slug: "overview", text: "Overview" },
    ...headings,
  ].filter(({ depth }) => depth > 1 && depth < 4);

  const tocRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState("overview");
  const onThisPageId = "on-this-page-heading";

  useEffect(() => {
    if (!tocRef.current) return;

    // Thanks Astro for the IntersectionObserver:
    // https://github.com/withastro/docs/blob/main/src/components/RightSidebar/TableOfContents.tsx

    const setCurrent: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const { id } = entry.target;
          if (id === onThisPageId) continue;
          setActive(entry.target.id);
          break;
        }
      }
    };

    const headingsObserver = new IntersectionObserver(setCurrent, {
      rootMargin: "-100px 0% -66%",
      threshold: 1,
    });

    // Observe all the headings in the main page content.
    document
      .querySelectorAll("article :is(h1,h2,h3)")
      .forEach((h) => headingsObserver.observe(h));

    // Stop observing when the component is unmounted.
    return () => headingsObserver.disconnect();
  }, [tocRef.current]);

  return (
    <div>
      <h2
        className="text-lg mb-4 font-semibold dark:text-t3-purple-50 text-slate-900"
        id={onThisPageId}
      >
        On this page
      </h2>
      <ul
        ref={tocRef}
        className="w-full border-l-2 border-t3-purple-300 marker:text-t3-purple-300  dark:border-t3-purple-200 my-1 list-none"
      >
        {headings.map((heading, i) => {
          const { depth, slug, text } = heading;

          return (
            <li
              key={i}
              className={`pl-${depth * 2 - 2} ml-1 w-full list-none pb-1`}
            >
              <a
                className={clsx(
                  `hover:text-t3-purple-700 dark:hover:text-t3-purple-100 text-t3-purple-500 dark:text-t3-purple-200`,
                  {
                    "underline text-t3-purple-700 dark:text-t3-purple-100":
                      active === slug,
                  },
                )}
                href={`#${slug}`}
              >
                {text}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
