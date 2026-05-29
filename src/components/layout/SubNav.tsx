// src/components/layout/SubNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SubNav({ subjects }: { subjects: { name: string; slug: string }[] }) {
  const pathname = usePathname();
  const lang = pathname.split('/')[1] || 'mr';

  return (
    // 'hidden sm:block' काढून टाकले आहे!
    // <nav className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-14 z-40 shadow-sm transition-colors duration-300">
    <nav className="bg-[var(--bg-surface)] border-b border-[var(--border-base)] sticky top-14 z-40 shadow-sm transition-colors duration-300">
      {/* overflow-x-auto मुळे मोबाईलवर मेनू आडवा स्क्रोल होईल */}
      <div className="px-4 sm:px-6 flex items-center h-12 overflow-x-auto custom-scrollbar">
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
  );
}