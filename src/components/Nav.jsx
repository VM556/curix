// import { useState, useEffect } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useTheme } from "../contexts/ThemeContext";
import clsx from "clsx";

export default function Nav() {
  const { darkMode, toggleDarkMode } = useTheme();

  // useEffect(() => {
  //   console.log("Dark mode:", darkMode);
  //   document.documentElement.setAttribute(
  //     "data-theme",
  //     darkMode ? "dark" : "light"
  //   );
  // }, [darkMode]);

  return (
    <nav
      className={clsx(
        "flex justify-center items-center w-screen py-1 shadow transition-colors duration-300",
        {
          "bg-gray-200": !darkMode,
          "bg-gray-800": darkMode,
        }
      )}
    >
      <div className="w-2xs md:w-lg lg:w-7xl md:mx-auto max-w-screen flex justify-between items-center">
        <div
          className={clsx(
            "text-4xl pt-1 transition-colors duration-200",
            { "text-slate-200": darkMode, "text-slate-800": !darkMode },
            "font-semibold"
          )}
        >
          Curix
        </div>
        <button
          onClick={toggleDarkMode}
          className="btn btn-outline shadow p-2 transition-transform duration-300 hover:scale-110 border-gray-400 rounded-xl hover:bg-transparent"
        >
          {darkMode ? (
            <SunIcon className="size-6 text-yellow-400" />
          ) : (
            <MoonIcon className="size-6 text-slate-700" />
          )}
        </button>
      </div>
    </nav>
  );
}
