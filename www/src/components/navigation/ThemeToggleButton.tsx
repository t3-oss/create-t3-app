/** @jsxImportSource react */
import { useEffect, useState } from "react";
import clsx from "clsx";

const themes = ["light", "dark"] as const;
type Theme = typeof themes[number];
const LOCAL_STORAGE_KEY = "theme";

const SunIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 fill-current stroke-current"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
      clipRule="evenodd"
    />
  </svg>
);
const MoonIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 fill-current stroke-current"
    viewBox="0 0 20 20"
  >
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
);

export default function ThemeToggleButton() {
  const [theme, _setTheme] = useState<Theme>("dark");

  const setTheme = (theme: Theme) => {
    _setTheme(theme);
    localStorage.setItem(LOCAL_STORAGE_KEY, theme);

    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
    }
  };

  useEffect(() => {
    const item = localStorage.getItem(LOCAL_STORAGE_KEY);
    const mediaMatch = window.matchMedia("(prefers-color-scheme: dark)");

    const newTheme = item ?? (mediaMatch.matches ? "dark" : "light");
    // only update state, dom is already updated from script-tag in `headCommon.astro`
    _setTheme(newTheme as Theme);
  }, [theme]);

  return (
    <div className="flex bg-t3-purple-200/50 dark:bg-slate-700 p-2 w-fit mx-auto rounded-lg gap-3">
      {themes.map((t) => {
        const checked = t === theme;
        return (
          <label
            key={t}
            className={clsx(
              "cursor-pointer text-slate-900 dark:text-slate-200",
              {
                "text-orange-500": checked,
                "dark:text-blue-500": checked,
              },
            )}
          >
            {t === "dark" ? <MoonIcon /> : <SunIcon />}
            <input
              className="absolute invisible"
              type="radio"
              name="theme-toggle"
              checked={checked}
              value={t}
              title={`Use ${t}-mode`}
              aria-label={`Use ${t}-mode`}
              onChange={() => setTheme(t)}
            />
          </label>
        );
      })}
    </div>
  );
}
