// src/components/layout/Sidebar.tsx
"use client";
import { BookOpen, X, Lock } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import { SubjectConfig } from "@/config/navigation";

interface SidebarProps {
  subject: SubjectConfig;
}

export default function Sidebar({ subject }: SidebarProps) {
  const pathname = usePathname();
  const { isOpen, setIsOpen } = useSidebar();
  const lang = pathname.split('/')[1] || 'mr';

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`sidebar-overlay fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`} 
        onClick={() => setIsOpen(false)}
      ></div>
      
      {/* Sidebar Container */}
      <aside className={`fixed lg:sticky top-0 lg:top-[6.5rem] left-0 h-full lg:h-[calc(100vh-6.5rem)] w-72 bg-[var(--bg-base)] border-r border-[var(--border-base)] z-50 lg:z-10 flex flex-col flex-shrink-0 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Mobile Header */}
        <div className="p-4 border-b border-[var(--border-base)] lg:hidden flex justify-between items-center bg-[var(--bg-surface)]">
          <span className="font-bold text-[var(--text-main)] flex items-center gap-2 line-clamp-1">
            <BookOpen className="w-5 h-5 text-[var(--brand-main)] flex-shrink-0" /> 
            {subject.title}
          </span>
          <button 
            onClick={() => setIsOpen(false)} 
            className="p-2 text-[var(--text-muted)] hover:text-[var(--brand-main)] hover:bg-[var(--bg-hover)] rounded-[var(--radius-base)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lessons List (Tailwind Docs Style) */}
        <div className="py-8 px-6 flex-1 overflow-y-auto custom-scrollbar">
          <div className="flex flex-col gap-8">
            {subject.groups.map((group, groupIndex) => (
              <div key={groupIndex} className="flex flex-col">
                
                {/* १. Group Heading (12px, Mono, Muted) */}
                <h3 className="font-mono text-xs font-medium tracking-widest text-[var(--text-muted)] uppercase mb-3 pl-1">
                  {group.subtitle}
                </h3>
                
                {/* २. सलग डावी रेषा (Continuous Left Border) */}
                <ul className="flex flex-col border-l border-[var(--border-base)] ml-1">
                  {group.lessons.map((lesson) => {
                    const lessonUrl = `/${lang}/${subject.slug}/${lesson.slug}`;
                    const isActive = pathname === lessonUrl;
                    const isLocked = lesson.accessTier && lesson.accessTier !== "free" && lesson.accessTier !== "starter" && false;

                    return (
                      // ३. -ml-px ची जादू (बॉर्डर ओव्हरलॅप करण्यासाठी)
                      <li key={lesson.slug} className="-ml-px flex flex-col items-start">
                        <Link 
                          href={lessonUrl} 
                          onClick={() => setIsOpen(false)}
                          // ४. Link Styling (14px, No background, Text and Border Colors)
                          className={`inline-flex items-center justify-between w-full border-l py-1 pl-4 text-[14px] transition-colors duration-200 ${
                            isActive 
                            ? "border-[var(--text-strong)] text-[var(--text-strong)] font-semibold" 
                            : "border-transparent text-[var(--text-main)] hover:border-[var(--border-strong)] hover:text-[var(--text-strong)] font-medium"
                          }`}
                        >
                          <span className="truncate pr-2">
                            {lesson.title}
                          </span>
                          
                          {/* Locked Icon (जर धडा लॉक असेल तर) */}
                          {isLocked && <Lock className="w-3 h-3 text-[var(--text-muted)] flex-shrink-0" />}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
                
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}