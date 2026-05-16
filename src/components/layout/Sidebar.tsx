"use client";
import { BookOpen, X, ChevronRight, Lock } from "lucide-react";
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

  // URL मधून भाषा ओळखणे
  const lang = pathname.split('/')[1] || 'mr';

  return (
    <>
      <div className={`sidebar-overlay fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden ${isOpen ? "active" : ""}`} onClick={() => setIsOpen(false)}></div>
      
      <aside className={`fixed lg:sticky top-0 lg:top-[6.5rem] left-0 h-full lg:h-[calc(100vh-6.5rem)] w-72 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50 lg:z-10 flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out transform ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        
        {/* Mobile Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 lg:hidden flex justify-between items-center bg-slate-50 dark:bg-slate-900">
          <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2 line-clamp-1">
            <BookOpen className="w-5 h-5 text-brand-500 flex-shrink-0" /> {subject.title}
          </span>
          <button onClick={() => setIsOpen(false)} className="p-2 text-slate-500 hover:text-brand-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Groups and Lessons from navigation.ts */}
        <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
          {subject.groups.map((group, groupIndex) => (
            <div key={groupIndex} className={groupIndex !== 0 ? "mt-8" : ""}>
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 px-3">
                {group.subtitle}
              </h3>
              
              <nav className="space-y-1">
                {group.lessons.map((lesson) => {
                  // आता लिंक बनवताना आपण भाषा (lang) वापरत आहोत!
                  const lessonUrl = `/${lang}/${subject.slug}/${lesson.slug}`;
                  const isActive = pathname === lessonUrl;
                  const isLocked = lesson.accessTier && lesson.accessTier !== "free" && lesson.accessTier !== "starter" && false;

                  return (
                    <Link 
                      key={lesson.slug} 
                      href={lessonUrl} 
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all border ${
                        isActive 
                        ? "bg-white dark:bg-slate-800 text-brand-700 dark:text-brand-400 shadow-sm border-brand-200 dark:border-brand-800/50 relative" 
                        : "text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-brand-600 border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-brand-500 rounded-r-full"></div>}
                        <ChevronRight className={`w-4 h-4 flex-shrink-0 ${isActive ? "ml-1" : ""}`} />
                        <span className={`text-sm ${isActive ? "font-bold" : "font-medium"} truncate`}>
                          {lesson.title}
                        </span>
                      </div>
                      
                      {isLocked && <Lock className="w-3 h-3 text-slate-400 flex-shrink-0" />}
                    </Link>
                  )
                })}
              </nav>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}