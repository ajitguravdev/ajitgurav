// src/components/layout/MobileMenu.tsx
"use client";

import Link from "next/link";
import ThemeControls from "./ThemeControls";

interface MobileMenuProps {
  isOpen: boolean;
  lang: string;
}

export default function MobileMenu({ isOpen, lang }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden absolute top-14 left-0 w-full bg-[var(--bg-surface)] text-[var(--text-main)] border-b border-[var(--border-base)] shadow-lg p-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
      <nav className="flex flex-col gap-3">
        <Link href={`/${lang}`} className="text-white dark:text-black text-base font-semibold hover:text-[var(--brand-main)]">Home</Link>
        <Link href={`/${lang}/about`} className="text-[var(--text-main)] text-base font-semibold hover:text-[var(--brand-main)]">About Us</Link>
        <Link href={`/${lang}/contact`} className="text-[var(--text-main)] text-base font-semibold hover:text-[var(--brand-main)]">Contact</Link>
      </nav>

      <div className="flex items-center justify-between pt-4 border-t border-[var(--border-base)]">
        <span className="text-sm font-medium text-[var(--text-muted)]">Theme Colors</span>
        
        {/* इथे आपण मोबाईलसाठी ThemeControls वापरला आहे */}
        <ThemeControls isMobile={true} />
      </div>
    </div>
  );
}