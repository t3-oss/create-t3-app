import { SIDEBAR } from "../../config";
import { getLanguageFromURL } from "../../languages";

type SlugType = "" | "usage" | "deployment";

export default function BreadCrumbs() {
  const lang = getLanguageFromURL(window.location.href);
  const slugToEntryPath = (slug: SlugType) => {
    switch (slug) {
      case "":
        return "Create T3 App";
      case "usage":
        return "Usage";
      case "deployment":
        return "Deployment";
    }
  };
  const slug =
    window.location.pathname.slice(1).split("/").length > 2
      ? window.location.pathname.slice(1).split("/")[1]
      : "" || "";
  const actualEntries =
    SIDEBAR[lang][
      slugToEntryPath(
        slug === undefined || slug === "" ? "" : (slug as SlugType),
      )
    ];

  const getPathNameFromLink = (link: string) => {
    return actualEntries?.find((entry) => entry.link === link)?.text;
  };

  const breadcrumbs = window.location.href
    .split("/")
    .slice(window.location.href.split("/").length > 5 ? -2 : -1)
    .map((crumb) => {
      const href = window.location.href
        .split("/")
        .slice(0, window.location.href.split("/").indexOf(crumb) + 1)
        .join("/");
      return {
        href,
        text:
          getPathNameFromLink(href.slice(href.indexOf("en"))) ||
          crumb[0]?.toUpperCase() + crumb.slice(1),
      };
    });

  return (
    <div className="mb-4 flex items-center gap-2 px-2 text-sm">
      <a
        href="/"
        className="rounded-lg border bg-t3-purple-200/50 p-1 hover:bg-t3-purple-200/75 dark:border-t3-purple-200/20 dark:bg-t3-purple-200/10 dark:hover:border-t3-purple-200/50"
      >
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="m12 5.561l-7 5.6V19h5v-4h4v4h5v-7.358a1 1 0 0 0-.375-.781L12 5.561ZM12 3l7.874 6.3A3 3 0 0 1 21 11.641V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7.839A2 2 0 0 1 3.75 9.6L12 3Z"
          />
        </svg>
      </a>
      <svg width="16" height="16" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          fill-rule="evenodd"
          d="m9.005 4l8 8l-8 8L7 18l6.005-6L7 6z"
        />
      </svg>
      {breadcrumbs.map((crumb, index) => (
        <div className="flex items-center gap-2">
          <a
            href={crumb.href}
            className="rounded-lg border bg-t3-purple-200/50 p-1 hover:bg-t3-purple-200/75 dark:border-t3-purple-200/20 dark:bg-t3-purple-200/10 dark:hover:border-t3-purple-200/50"
          >
            {crumb.text}
          </a>
          {index < breadcrumbs.length - 1 && (
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="m9.005 4l8 8l-8 8L7 18l6.005-6L7 6z"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
