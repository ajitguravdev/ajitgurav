"use client";

import { useState, useEffect } from "react";
import { Menu, Terminal, Moon, Sun, Globe, MoreVertical, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import { siteConfig } from "@/config/site";
import { useTheme } from "next-themes"; 

export default function Header({ subjects }: { subjects: { name: string; slug: string }[] }) {
  const [mounted, setMounted] = useState(false); 
  const [activeTheme, setActiveTheme] = useState("teal");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { setIsOpen } = useSidebar();
  const { theme, setTheme, resolvedTheme } = useTheme(); 

  const lang = pathname.split('/')[1] || 'mr';

  const isGeneralPage =
    pathname === `/${lang}` ||
    pathname === `/${lang}/` ||
    pathname.startsWith(`/${lang}/about`) ||
    pathname.startsWith(`/${lang}/contact`) ||
    pathname.startsWith(`/${lang}/privacy`);

  const showSidebarIcon = !isGeneralPage;

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("color-theme") || "teal";
    setActiveTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleDarkMode = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const changeTheme = (newTheme: string) => {
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("color-theme", newTheme);
    setActiveTheme(newTheme);
  };

  const switchLanguage = (newLang: string) => {
    document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000`;
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <>
      {/* 
        Top Global Header (दुसऱ्या UI नुसार)
        हा भाग कायम Dark (slate-900) राहील, त्यामुळे इथे आपण आपले Dark Mode चे फिक्स क्लासेस लावले आहेत.
      */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50 transition-colors duration-300 relative">
        <div className="px-4 sm:px-6 h-14 flex items-center justify-between">
          
          {/* Left Side: Logo & Sidebar Icon */}
          <div className="flex items-center gap-3">
            {showSidebarIcon && (
              <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden p-2 -ml-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg focus:outline-none transition-colors">
                <Menu className="w-6 h-6" />
              </button>
            )}
            
            <Link href={`/${lang}`} className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-[var(--brand-main)]" />
              <span className="font-bold text-lg tracking-wide">
                {siteConfig.name}
              </span>
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            <nav className="hidden lg:flex items-center gap-6 mr-2">
              <Link href={`/${lang}`} className={`text-sm font-bold transition-colors ${pathname === `/${lang}` ? "text-[var(--brand-main)] border-b-2 border-[var(--brand-main)] pb-1" : "text-slate-300 hover:text-white"}`}>Home</Link>
              <Link href={`/${lang}/about`} className={`text-sm font-bold transition-colors ${pathname.startsWith(`/${lang}/about`) ? "text-[var(--brand-main)] border-b-2 border-[var(--brand-main)] pb-1" : "text-slate-300 hover:text-white"}`}>About Us</Link>
              <Link href={`/${lang}/contact`} className={`text-sm font-bold transition-colors ${pathname.startsWith(`/${lang}/contact`) ? "text-[var(--brand-main)] border-b-2 border-[var(--brand-main)] pb-1" : "text-slate-300 hover:text-white"}`}>Contact</Link>
            </nav>

            {/* Language Dropdown (Dark Background) */}
            <div className="flex items-center gap-1.5 bg-slate-800 px-2 py-1.5 rounded-lg border border-slate-700">
              <Globe className="w-4 h-4 text-slate-400" />
              <select 
                value={lang} 
                onChange={(e) => switchLanguage(e.target.value)}
                className="bg-transparent text-sm font-medium text-slate-200 focus:outline-none cursor-pointer appearance-none pr-1"
              >
                <option value="mr" className="bg-slate-800 text-white p1">मराठी</option>
                <option value="hi" className="bg-slate-800 text-white p1">हिंदी</option>
                <option value="en" className="bg-slate-800 text-white p1">English</option>
              </select>
            </div>

            {/* Desktop Theme Controls (Dark Background) */}
            <div className="hidden lg:flex items-center gap-3 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700 transition-colors duration-300">
              {(["teal", "blue", "violet", "amber"] as const).map((color) => (
                <button
                  key={color}
                  onClick={() => changeTheme(color)}
                  className={`w-4 h-4 rounded-full hover:scale-110 transition-transform ${activeTheme === color ? "scale-125 ring-2 ring-white ring-offset-1 ring-offset-slate-900" : ""}`}
                  // इथे आपण tokens.css मधील फिक्स कलर्स वापरत आहोत
                  style={{ backgroundColor: `var(--color-${color})` }}
                  aria-label={`${color} Theme`}
                />
              ))}
              <div className="w-px h-4 bg-slate-600 mx-1"></div>
              
              <button onClick={toggleDarkMode} className="text-slate-400 hover:text-white transition-colors focus:outline-none">
                {mounted && resolvedTheme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <MoreVertical className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* --- Mobile Dropdown Menu --- */}
        {/* हा भाग डार्क/लाईट मोडनुसार बदलेल, कारण इथे आपण डायनॅमिक टोकन्स वापरले आहेत */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-14 left-0 w-full bg-[var(--bg-surface)] text-[var(--text-main)] border-b border-[var(--border-base)] shadow-lg p-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
            <nav className="flex flex-col gap-3">
              <Link href={`/${lang}`} className="text-base font-semibold hover:text-[var(--brand-main)]">Home</Link>
              <Link href={`/${lang}/about`} className="text-base font-semibold hover:text-[var(--brand-main)]">About Us</Link>
              <Link href={`/${lang}/contact`} className="text-base font-semibold hover:text-[var(--brand-main)]">Contact</Link>
            </nav>

            <div className="flex items-center justify-between pt-4 border-t border-[var(--border-base)]">
              <span className="text-sm font-medium text-[var(--text-muted)]">Theme Colors</span>
              <div className="flex items-center gap-3 bg-[var(--bg-base)] px-3 py-2 rounded-full border border-[var(--border-base)]">
                {(["teal", "blue", "violet", "amber"] as const).map((color) => (
                  <button
                    key={color}
                    onClick={() => changeTheme(color)}
                    className={`w-5 h-5 rounded-full ${activeTheme === color ? "scale-110 ring-2 ring-[var(--text-main)]" : ""}`}
                    style={{ backgroundColor: `var(--color-${color})` }}
                  />
                ))}
                <div className="w-px h-5 bg-[var(--border-base)] mx-1"></div>
                <button onClick={toggleDarkMode}>
                  {mounted && resolvedTheme === "dark" ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-[var(--text-muted)]" />}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Sub Navigation Bar (Dynamic Theme) */}
      {/* हा भाग दुसऱ्या UI नुसार डार्क/लाईट मोडमध्ये आपोआप बदलेल */}
      <nav className="bg-[var(--bg-active)] border-b border-[var(--border-base)] sticky top-14 z-40 hidden sm:block shadow-sm transition-colors duration-300">
        <div className="px-6 flex items-center h-12 overflow-x-auto hide-scrollbar">
          {subjects.map((sub) => {
            const isActive = pathname.startsWith(`/${lang}/${sub.slug}`);
            return (
              <Link
                key={sub.slug}
                href={`/${lang}/${sub.slug}`}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                  isActive
                    ? "border-[var(--brand-main)] text-[var(--brand-main)]"
                    : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--border-strong)]"
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