import type { MarkdownHeading } from "astro";
import { useEffect, useMemo, useState } from "react";
import { Menu } from "@headlessui/react";
import clsx from "clsx";

type OnThisPageLinksProps = {
  headings: MarkdownHeading[];
  title: string;
};

export default function OnThisPageLinks({
  headings,
  title,
}: OnThisPageLinksProps) {
  const memoedHeadings = useMemo(() => {
    // add isVisible flag in headers
    const headers = [
      { depth: 2, slug: "overview", text: title, isVisible: true },
      ...headings.map((h) => ({ ...h, isVisible: false })),
    ];

    return headers.filter(({ depth }) => depth > 1 && depth < 4);
  }, [headings, title]);

  const [headingWithIsVisible, setHeadingWithIsVisible] =
    useState(memoedHeadings);

  useEffect(() => {
    const articleHeadings = Array.from(
      document.querySelectorAll("article :is(h1,h2,h3)"),
    );

    const allObservers = articleHeadings.map((h) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const id = entry.target.id;
            const tocItem = Array.from(
              document.querySelectorAll(`a[href="#${id}"]`),
            ).at(-1);
            // occurs when the id = "toc-heading"
            if (!tocItem) return;

            if (entry.isIntersecting) {
              const headings = headingWithIsVisible.map((h) =>
                h.slug === id
                  ? { ...h, isVisible: true }
                  : { ...h, isVisible: false },
              );
              setHeadingWithIsVisible(headings);
            }
          });
        },
        {
          rootMargin: "-100px 0% -66%",
          threshold: 1,
        },
      );

      observer.observe(h);

      return observer;
    });

    return () => {
      // unobserve elements
      articleHeadings.map((h, index) => {
        allObservers[index]?.unobserve(h);
      });
    };
  }, [headings, title]);

  return (
    <div className="sticky inset-x-0 top-20 z-[2] block w-full bg-default px-3 py-4 lg:hidden">
      <Menu>
        {({ open }) => (
          <div className="relative w-full">
            <div className="">
              <Menu.Button className="inline-flex cursor-pointer items-center whitespace-nowrap rounded-md border-2 bg-t3-purple-200/50 px-2 py-1.5 text-sm font-medium hover:bg-t3-purple-200/75 dark:border-t3-purple-200/20 dark:bg-t3-purple-200/10 dark:hover:border-t3-purple-200/50">
                On this page
                <span className="ml-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-3 w-3 sm:h-4 sm:w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={
                        open
                          ? "M19.5 8.25l-7.5 7.5-7.5-7.5"
                          : "M8.25 4.5l7.5 7.5-7.5 7.5"
                      }
                    />
                  </svg>
                </span>
              </Menu.Button>
            </div>
            <Menu.Items
              as="ul"
              className="t3-scrollbar absolute top-full z-10 mt-3 max-h-80 w-full overflow-y-auto rounded-md border-2 border-primary bg-default py-1.5 shadow-md dark:border-t3-purple-200/20 dark:bg-default"
            >
              {headingWithIsVisible.map((heading) => (
                <li key={heading.slug} className="w-full">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className={clsx(
                          "line-clamp-1 block w-full py-1 text-sm text-t3-purple-800 transition-colors hover:bg-t3-purple-300/20 hover:text-t3-purple-400 dark:text-t3-purple-200 dark:hover:bg-t3-purple-300/10 dark:hover:text-t3-purple-100",
                          `pl-${heading.depth * 2 - 2}`,
                          {
                            "bg-t3-purple-300/20 text-t3-purple-400 underline dark:bg-t3-purple-300/10 dark:text-t3-purple-100":
                              active,
                            "bg-t3-purple-300/30 font-medium text-t3-purple-700 underline dark:bg-t3-purple-300/20 dark:text-t3-purple-100":
                              heading.isVisible,
                          },
                        )}
                        href={`#${heading.slug}`}
                      >
                        {heading.text}
                      </a>
                    )}
                  </Menu.Item>
                </li>
              ))}
            </Menu.Items>
          </div>
        )}
      </Menu>
    </div>
  );
}
