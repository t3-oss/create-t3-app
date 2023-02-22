import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useLayoutEffect, useState } from "react";

type ThemesNames = (typeof themesOptions)[number]["name"];

const findThemeByName = (name: ThemesNames) => {
  return themesOptions.find((theme) => theme.name === name);
};

const themesOptions = [
  {
    name: "system",
    Icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 fill-current stroke-current transition-colors duration-300"
        viewBox="0 0 24 24"
      >
        <path
          d="m11.998 2c5.517 0 9.997 4.48 9.997 9.998 0 5.517-4.48 9.997-9.997 9.997-5.518 0-9.998-4.48-9.998-9.997 0-5.518 4.48-9.998 9.998-9.998zm0 1.5c-4.69 0-8.498 3.808-8.498 8.498s3.808 8.497 8.498 8.497z"
          fillRule="nonzero"
        />
      </svg>
    ),
    clickHandler: () => {
      localStorage.setItem("theme", "");
    },
  },
  {
    name: "light",
    Icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 fill-current stroke-current stroke-2 transition-colors duration-300"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        />
      </svg>
    ),
    clickHandler: () => {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    },
  },
  {
    name: "dark",
    Icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 fill-current stroke-current transition-colors duration-300"
        viewBox="0 0 20 20"
      >
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
      </svg>
    ),
    clickHandler: () => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    },
  },
] as const;

export default function ColorSchemeSelect() {
  const [selectedTheme, setSelectedTheme] = useState<ThemesNames | null>(null);

  useLayoutEffect(() => {
    const theme = localStorage.getItem("theme") as ThemesNames;
    setSelectedTheme(theme || "system");

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (e.matches) {
          findThemeByName("dark")?.clickHandler();
          setSelectedTheme("dark");
        } else {
          setSelectedTheme("light");
          findThemeByName("light")?.clickHandler();
        }
      });
  }, []);

  const changeHandler = (themeName: ThemesNames) => {
    setSelectedTheme(themeName);
    findThemeByName(themeName)?.clickHandler();
  };

  return (
    <div className="flex items-center gap-2">
      <Listbox value={selectedTheme} onChange={changeHandler}>
        <div className="relative">
          <Listbox.Button className="relative flex aspect-square h-11 cursor-pointer items-center justify-center rounded-lg border bg-t3-purple-200/50 p-2 text-left focus:outline-none hover:bg-t3-purple-200/75 dark:border-t3-purple-200/20 dark:bg-t3-purple-200/10 dark:hover:border-t3-purple-200/50 sm:text-sm">
            {selectedTheme && findThemeByName(selectedTheme)?.Icon}
          </Listbox.Button>
          <Transition
            as={Fragment}
            enter={"transition ease-out duration-100"}
            enterFrom={"transform opacity-0 -translate-y-1"}
            enterTo={"transform opacity-100 -translate-y-0"}
          >
            <Listbox.Options
              dir="ltr"
              className="focus-none shadow-l t3-scrollbar absolute right-0 mt-1 max-h-60 w-fit overflow-auto rounded-lg border bg-default text-base focus:outline-none focus-visible:outline-none dark:border-t3-purple-200/20 sm:text-sm"
            >
              {themesOptions.map(({ Icon, name }) => (
                <Listbox.Option
                  key={name}
                  className={({ selected, active }) =>
                    `focus-none relative cursor-pointer bg-t3-purple-200/50 py-2 px-4 text-slate-900 outline-none hover:bg-t3-purple-300/75 dark:bg-t3-purple-200/10 dark:text-t3-purple-100 dark:hover:bg-t3-purple-200/20 ${
                      selected && "bg-t3-purple-400/75 dark:bg-t3-purple-400/20"
                    }
                    ${active && "bg-t3-purple-300/75 dark:bg-t3-purple-200/20"}`
                  }
                  value={name}
                >
                  {({ selected }) => (
                    <div className="flex items-center gap-3">
                      {Icon}
                      <p
                        aria-current={selected ? "true" : "false"}
                        className="truncate font-normal capitalize aria-[current=true]:font-medium"
                      >
                        {name}
                      </p>
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
