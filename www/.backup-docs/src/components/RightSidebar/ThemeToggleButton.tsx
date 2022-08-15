import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "dark");
  const handleClick = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <>
      <button
        className="rounded-xl p-2 border border-slate-800 dark:border-slate-50"
        onClick={handleClick}
      >
        {theme === "light" ? "🌙" : "🌞"}
      </button>
    </>
  );
};

export default ThemeToggle;
