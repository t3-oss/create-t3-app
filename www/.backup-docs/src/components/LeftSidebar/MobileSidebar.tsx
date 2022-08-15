import { SIDEBAR } from "../../config";
import { getLanguageFromURL } from "../../languages";
import { useStore } from "@nanostores/react";
import { sidebarState } from "../../store/Sidebar";
import ThemeToggle from "../RightSidebar/ThemeToggleButton";

const MobileSidebar = ({
  currentPage,
  pathName,
}: {
  currentPage: string;
  pathName: string;
}) => {
  const currentPageMatch = currentPage.slice(1);
  const langCode = getLanguageFromURL(currentPage);
  const $isSideBarOpen = useStore(sidebarState);
  const sidebarSections = SIDEBAR[langCode].reduce((col, item, i) => {
    // If the first item is not a section header, create a new container section.
    if (i === 0) {
      if (!item.header) {
        const pesudoSection = { text: "" };
        col.push({ ...pesudoSection, children: [] });
      }
    }
    if (item.header) {
      col.push({ ...item, children: [] });
    } else {
      col[col.length - 1].children.push(item);
    }
    return col;
  }, []);

  return (
    <>
      {$isSideBarOpen ? (
        <nav
          className="dark:bg-dark-background bg-slate-50 text-black dark:text-slate-50 -z-0 absolute top-20 left-0 w-screen h-full shadow-2xl overflow-y-scroll prose dark:prose-invert prose-ul:list-none scrollbar-thin dark:scrollbar-thumb-slate-500 scrollbar-thumb-slate-800 scrollbar-track-gray-100"
          aria-labelledby="grid-left"
        >
          <ul className="pl-6">
            <ThemeToggle />
            {sidebarSections.map((section, i) => (
              <li key={i}>
                <div>
                  <h2 className="p-1 mb-2 mt-0 font-bold not-prose text-black dark:text-slate-50 text-xl ">
                    {section.text}
                  </h2>
                  <ul>
                    {section.children.map((child, i) => (
                      <li
                        key={i}
                        className="text-black dark:text-slate-50 text-base"
                      >
                        <a
                          href={
                            child.external
                              ? `${child.link}`
                              : `${pathName}${child.link}`
                          }
                          rel="noopener noreferrer"
                          target={child.external ? "_blank" : "_self"}
                          aria-current={`${
                            currentPageMatch === child.link ? "page" : "false"
                          }`}
                          className={`${
                            currentPageMatch === child.link
                              ? "font-extrabold italic underline-offset-2"
                              : "font-semibold no-underline"
                          }`}
                        >
                          {child.external ? `${child.text}↗` : `${child.text}`}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </>
  );
};

export default MobileSidebar;
