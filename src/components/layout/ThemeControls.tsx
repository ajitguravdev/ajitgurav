// src/components/layout/ThemeControls.tsx
"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Check } from "lucide-react";
import { useTheme } from "next-themes";

interface ThemeControlsProps {
  isMobile?: boolean;
}

// थीमच्या बटणांसाठी फिक्स रंग (जेणेकरून ते नेहमी दिसतील)
const THEME_COLORS = {
  teal: "#14b8a6",
  blue: "#3b82f6",
  violet: "#8b5cf6",
  amber: "#f59e0b"
} as const;

export default function ThemeControls({ isMobile = false }: ThemeControlsProps) {
  const [mounted, setMounted] = useState(false);
  const [activeTheme, setActiveTheme] = useState("teal");
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("color-theme") || "teal";
    setActiveTheme(savedTheme);
  }, []);

  const toggleDarkMode = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");
  
  const changeTheme = (newTheme: string) => {
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("color-theme", newTheme);
    setActiveTheme(newTheme);
  };

  const containerClass = isMobile
    ? "flex items-center gap-3 bg-[var(--bg-base)] px-3 py-2 rounded-full border border-[var(--border-base)]"
    : "hidden lg:flex items-center gap-3 bg-neutral-900 px-3 py-1.5 rounded-full border border-neutral-800 transition-colors duration-300";

  const dividerClass = isMobile ? "w-px h-5 bg-[var(--border-base)] mx-1" : "w-px h-4 bg-slate-600 mx-1";
  const iconClass = isMobile ? "text-[var(--text-muted)]" : "text-slate-400 hover:text-white transition-colors focus:outline-none";

  return (
    <div className={containerClass}>
      {(Object.keys(THEME_COLORS) as Array<keyof typeof THEME_COLORS>).map((color) => (
        <button
          key={color}
          onClick={() => changeTheme(color)}
          // जर थीम ॲक्टिव्ह असेल, तर बटण थोडे मोठे होईल आणि बॉर्डर येईल
          className={`relative w-5 h-5 rounded-full flex items-center justify-center transition-transform ${
            activeTheme === color
              ? "scale-110 ring-0 ring-offset-2 ring-offset-[var(--bg-surface)] ring-[var(--text-main)]"
              : "hover:scale-110 opacity-80 hover:opacity-100"
          }`}
          style={{ backgroundColor: THEME_COLORS[color] }}
          aria-label={`${color} Theme`}
        >
          {/* ॲक्टिव्ह थीमवर Check (✓) आयकॉन दिसेल */}
          {activeTheme === color && <Check className="w-3 h-3 text-white" strokeWidth={4} />}
        </button>
      ))}
      
      <div className={dividerClass}></div>
      
      <button onClick={toggleDarkMode} className={iconClass}>
        {mounted && resolvedTheme === "dark" ? (
          <Sun className="w-4 h-4 text-amber-400" />
        ) : (
          <Moon className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}