"use client";

import { useTheme } from "next-themes";
import { useLayoutEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="px-3 py-2 rounded-xl border hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
