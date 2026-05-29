// src/components/layout/Header.tsx
"use client";

import { useState, useEffect } from "react";
import { Menu, Terminal, Globe, MoreVertical, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import { siteConfig } from "@/config/site";

// आपण बनवलेले नवीन कंपोनंट्स
import ThemeControls from "./ThemeControls";
import MobileMenu from "./MobileMenu";
import SubNav from "./SubNav";

export default function Header({ subjects }: { subjects: { name: string; slug: string }[] }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { setIsOpen } = useSidebar();

  const lang = pathname.split('/')[1] || 'mr';

  const isGeneralPage =
    pathname === `/${lang}` ||
    pathname === `/${lang}/` ||
    pathname.startsWith(`/${lang}/about`) ||
    pathname.startsWith(`/${lang}/contact`) ||
    pathname.startsWith(`/${lang}/privacy`);

  const showSidebarIcon = !isGeneralPage;

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const switchLanguage = (newLang: string) => {
    document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000`;
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <>
      {/* 🔴 'bg-slate-900' ऐवजी 'bg-black' आणि 'border-neutral-800' वापरले आहे (Pure Black Theme) */}
      <header className="bg-black text-white border-b border-neutral-800 sticky top-0 z-50 transition-colors duration-300 relative">
        <div className="px-4 sm:px-6 h-14 flex items-center justify-between">
          
          {/* Left Side: Logo & Sidebar Icon */}
          <div className="flex items-center gap-3">
            {showSidebarIcon && (
              <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden p-2 -ml-2 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-lg focus:outline-none transition-colors">
                <Menu className="w-6 h-6" />
              </button>
            )}
            
            <Link href={`/${lang}`} className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-[var(--brand-main)]" />
              <span className="font-bold text-lg tracking-wide">{siteConfig.name}</span>
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            <nav className="hidden lg:flex items-center gap-6 mr-2">
              <Link href={`/${lang}`} className={`text-sm font-bold transition-colors ${pathname === `/${lang}` ? "text-[var(--brand-main)] border-b-2 border-[var(--brand-main)] pb-1" : "text-neutral-300 hover:text-white"}`}>Home</Link>
              <Link href={`/${lang}/about`} className={`text-sm font-bold transition-colors ${pathname.startsWith(`/${lang}/about`) ? "text-[var(--brand-main)] border-b-2 border-[var(--brand-main)] pb-1" : "text-neutral-300 hover:text-white"}`}>About Us</Link>
              <Link href={`/${lang}/contact`} className={`text-sm font-bold transition-colors ${pathname.startsWith(`/${lang}/contact`) ? "text-[var(--brand-main)] border-b-2 border-[var(--brand-main)] pb-1" : "text-neutral-300 hover:text-white"}`}>Contact</Link>
            </nav>

            {/* Language Dropdown (Neutral Dark Background) */}
            <div className="flex items-center gap-1.5 bg-neutral-900 px-2 py-1.5 rounded-lg border border-neutral-800">
              <Globe className="w-4 h-4 text-neutral-400" />
              <select 
                value={lang} 
                onChange={(e) => switchLanguage(e.target.value)}
                className="bg-transparent text-sm font-medium text-neutral-200 focus:outline-none cursor-pointer appearance-none pr-1"
              >
                <option value="mr" className="bg-neutral-900 text-white">मराठी</option>
                <option value="hi" className="bg-neutral-900 text-white">हिंदी</option>
                <option value="en" className="bg-neutral-900 text-white">English</option>
              </select>
            </div>

            {/* 🔴 Desktop Theme Controls Component */}
            <ThemeControls />

            {/* Mobile Menu Toggle Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <MoreVertical className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* 🔴 Mobile Dropdown Menu Component */}
        <MobileMenu isOpen={isMobileMenuOpen} lang={lang} />
      </header>

      {/* 🔴 Sub Navigation Bar Component */}
      <SubNav subjects={subjects} />
    </>
  );
}