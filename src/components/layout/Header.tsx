"use client";

import { useState, useEffect } from "react";
// MoreVertical आणि X हे नवीन आयकॉन्स ॲड केले आहेत
import { Menu, Terminal, Moon, Sun, Globe, MoreVertical, X } from "lucide-react"; 
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import { siteConfig } from "@/config/site";

export default function Header({ subjects }: { subjects: { name: string; slug: string }[] }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTheme, setActiveTheme] = useState("teal");
  // मोबाईल मेनू (Home, About, Theme) उघडण्यासाठी नवीन स्टेट
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();
  const { setIsOpen } = useSidebar();

  const lang = pathname.split('/')[1] || 'mr';

  // १. साईडबार लपवण्याचे लॉजिक (फक्त धड्यांच्या पेजवरच दिसेल)
  const isGeneralPage = 
    pathname === `/${lang}` || 
    pathname === `/${lang}/` || 
    pathname.startsWith(`/${lang}/about`) || 
    pathname.startsWith(`/${lang}/contact`) || 
    pathname.startsWith(`/${lang}/privacy`);
    
  const showSidebarIcon = !isGeneralPage;

  useEffect(() => {
    const savedMode = localStorage.getItem("mode");
    const isDark = savedMode === "dark" || (!savedMode && document.documentElement.classList.contains("dark"));
    
    if (isDark) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }

    const savedTheme = localStorage.getItem("color-theme") || "teal";
    setActiveTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // जेव्हा पेज बदलते, तेव्हा मोबाईल मेनू आपोआप बंद व्हावा
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("mode", "light");
      setIsDarkMode(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("mode", "dark");
      setIsDarkMode(true);
    }
  };

  const changeTheme = (theme: string) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("color-theme", theme);
    setActiveTheme(theme);
  };

  const switchLanguage = (newLang: string) => {
    document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000`;
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <>
      {/* Top Global Header */}
      <header className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300 relative">
        <div className="px-4 sm:px-6 h-14 flex items-center justify-between">
          
          {/* Left Side: Logo & Sidebar Icon */}
          <div className="flex items-center gap-3">
            {/* फक्त धड्यांच्या पेजवर हा आयकॉन दिसेल */}
            {showSidebarIcon && (
              <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden p-2 -ml-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg focus:outline-none transition-colors">
                <Menu className="w-6 h-6" />
              </button>
            )}
            
            <Link href={`/${lang}`} className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <span className="font-bold text-lg tracking-wide text-slate-900 dark:text-white">{siteConfig.name}</span>
            </Link>
          </div>

          {/* Right Side: Desktop Nav, Lang, Theme & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Desktop Navigation (मोबाईलवर लपेल) */}
            <nav className="hidden lg:flex items-center gap-6 mr-2">
              <Link href={`/${lang}`} className={`text-sm font-bold transition-colors ${pathname === `/${lang}` ? "text-brand-600 dark:text-brand-400 border-b-2 border-brand-500 pb-1" : "text-slate-600 dark:text-slate-300 hover:text-brand-600"}`}>Home</Link>
              <Link href={`/${lang}/about`} className={`text-sm font-bold transition-colors ${pathname.startsWith(`/${lang}/about`) ? "text-brand-600 dark:text-brand-400 border-b-2 border-brand-500 pb-1" : "text-slate-600 dark:text-slate-300 hover:text-brand-600"}`}>About Us</Link>
              <Link href={`/${lang}/contact`} className={`text-sm font-bold transition-colors ${pathname.startsWith(`/${lang}/contact`) ? "text-brand-600 dark:text-brand-400 border-b-2 border-brand-500 pb-1" : "text-slate-600 dark:text-slate-300 hover:text-brand-600"}`}>Contact</Link>
            </nav>

            {/* Language Dropdown (सर्वीकडे दिसेल) */}
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/50 px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
              <Globe className="w-4 h-4 text-slate-500" />
              <select 
                value={lang} 
                onChange={(e) => switchLanguage(e.target.value)}
                className="bg-transparent text-sm font-medium text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer appearance-none pr-1"
              >
                <option value="mr" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">मराठी</option>
                <option value="hi" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">हिंदी</option>
                <option value="en" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">English</option>
              </select>
            </div>

            {/* Desktop Theme Controls (मोबाईलवर लपेल) */}
            <div className="hidden lg:flex items-center gap-3 bg-slate-100 dark:bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 transition-colors duration-300">
              {(["teal", "blue", "violet", "amber"] as const).map((color) => (
                <button
                  key={color}
                  onClick={() => changeTheme(color)}
                  className={`w-4 h-4 rounded-full hover:scale-110 transition-transform ${activeTheme === color ? "scale-125 ring-2 ring-white dark:ring-slate-900 ring-offset-1 ring-offset-slate-200 dark:ring-offset-slate-800" : ""}`}
                  style={{ backgroundColor: color === "teal" ? "#14b8a6" : color === "blue" ? "#3b82f6" : color === "violet" ? "#8b5cf6" : "#f59e0b" }}
                  aria-label={`${color} Theme`}
                />
              ))}
              <div className="w-px h-4 bg-slate-300 dark:bg-slate-600 mx-1"></div>
              <button onClick={toggleDarkMode} className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors focus:outline-none">
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-500 dark:text-amber-300" /> : <Moon className="w-4 h-4 text-slate-600" />}
              </button>
            </div>

            {/* Mobile Menu Toggle Button (फक्त मोबाईलवर दिसेल) */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <MoreVertical className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* --- Mobile Dropdown Menu --- */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-14 left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-lg p-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
            
            <nav className="flex flex-col gap-3">
              <Link href={`/${lang}`} className="text-base font-semibold text-slate-700 dark:text-slate-200 hover:text-brand-600">Home</Link>
              <Link href={`/${lang}/about`} className="text-base font-semibold text-slate-700 dark:text-slate-200 hover:text-brand-600">About Us</Link>
              <Link href={`/${lang}/contact`} className="text-base font-semibold text-slate-700 dark:text-slate-200 hover:text-brand-600">Contact</Link>
            </nav>

            {/* Theme Controls in Mobile Menu */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Theme Colors</span>
              <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 px-3 py-2 rounded-full border border-slate-200 dark:border-slate-700">
                {(["teal", "blue", "violet", "amber"] as const).map((color) => (
                  <button
                    key={color}
                    onClick={() => changeTheme(color)}
                    className={`w-5 h-5 rounded-full ${activeTheme === color ? "scale-110 ring-2 ring-slate-900 dark:ring-white" : ""}`}
                    style={{ backgroundColor: color === "teal" ? "#14b8a6" : color === "blue" ? "#3b82f6" : color === "violet" ? "#8b5cf6" : "#f59e0b" }}
                  />
                ))}
                <div className="w-px h-5 bg-slate-300 dark:bg-slate-600 mx-1"></div>
                <button onClick={toggleDarkMode}>
                  {isDarkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-slate-600" />}
                </button>
              </div>
            </div>

          </div>
        )}
      </header>

      {/* Sub Navigation Bar */}
      <nav className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-14 z-40 hidden sm:block shadow-sm transition-colors duration-300">
        <div className="px-6 flex items-center h-12 overflow-x-auto hide-scrollbar">
          {subjects.map((sub) => {
            const isActive = pathname.startsWith(`/${lang}/${sub.slug}`);
            return (
              <Link
                key={sub.slug}
                href={`/${lang}/${sub.slug}`}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                  isActive
                    ? "border-brand-500 text-brand-600 dark:text-brand-400"
                    : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}>
                {sub.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}