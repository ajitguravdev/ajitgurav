// src/app/[lang]/page.tsx
import Link from "next/link";
import { Terminal, BookOpen, Code, Database } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/lib/dictionary";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  const dict = await getDictionary(lang as "en" | "mr" | "hi");

  const subjectCards = [
    {
      id: "memory",
      title: dict.home.subject1_title, 
      desc: dict.home.subject1_desc,
      href: `/${lang}/memory-architecture/intro`,
      icon: BookOpen,
      color: "brand",
      isReady: true,
    },
    {
      id: "javascript",
      title: dict.home.subject_js_title || "JavaScript Internals", 
      desc: dict.home.subject_js_desc || "V8 Engine, Event Loop & Promises",
      href: `/${lang}/javascript/intro`,
      icon: Code,
      color: "blue",
      isReady: false,
    },
    {
      id: "datastructures",
      title: dict.home.subject_ds_title || "Data Structures",
      desc: dict.home.subject_ds_desc || "Arrays, Linked Lists, Trees & Algorithms",
      href: `/${lang}/data-structures/intro`,
      icon: Database,
      color: "violet",
      isReady: false,
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "brand": return "bg-[var(--brand-light)] text-[var(--brand-main)]";
      case "blue": return "bg-blue-100/50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
      case "violet": return "bg-violet-100/50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400";
      default: return "bg-[var(--bg-hover)] text-[var(--text-muted)]";
    }
  };

  return (
    <main className="flex-1 w-full px-4 sm:px-8 py-12 lg:py-24 max-w-7xl mx-auto transition-colors duration-300">
      
      {/* Hero Section */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-hover)] text-[var(--text-muted)] font-medium text-sm mb-6 border border-[var(--border-base)]">
          <Terminal className="w-4 h-4 text-[var(--brand-main)]" />
          {lang === "en"
            ? `${dict.home.welcome} ${siteConfig.name}`
            : `${siteConfig.name} ${dict.home.welcome}`}
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--text-main)] mb-6 tracking-tight">
          {dict.home.title_part1}{" "}
          <span className="text-[var(--brand-main)]">{dict.home.title_highlight1}</span>
          {dict.home.title_part2}{" "}
          {/* इथे आपण info semantic token वापरला आहे */}
          <span className="text-[var(--color-info)]">{dict.home.title_highlight2}</span>
        </h1>

        <p className="text-lg md:text-xl text-[var(--text-muted)] max-w-2xl mx-auto mb-10">
          {dict.home.description}
        </p>

        <Link
          href={`/${lang}/memory-architecture/intro`}
          className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-[var(--brand-main)] border border-transparent rounded-xl hover:opacity-90 hover:shadow-[var(--shadow-elevated)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--brand-main)]"
        >
          {dict.home.cta}
        </Link>
      </div>

      {/* Feature / Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {subjectCards.map((subject) => {
          const Icon = subject.icon;
          const CardContent = (
            <div className={`bg-[var(--bg-surface)] rounded-2xl p-8 border border-[var(--border-base)] shadow-[var(--shadow-base)] transition-all h-full ${
              subject.isReady 
                ? "hover:shadow-[var(--shadow-elevated)] hover:border-[var(--border-strong)]" 
                : "opacity-75"
            }`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform ${
                subject.isReady ? "group-hover:scale-110" : ""
              } ${getColorClasses(subject.color)}`}>
                <Icon className="w-6 h-6" />
              </div>
              
              <h3 className="text-xl font-bold text-[var(--text-main)] mb-3 flex justify-between items-center">
                {subject.title}
                {!subject.isReady && (
                  <span className="text-xs bg-[var(--bg-hover)] px-2 py-1 rounded text-[var(--text-muted)] font-medium border border-[var(--border-base)]">
                    {dict.home.coming_soon}
                  </span>
                )}
              </h3>
              
              <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                {subject.desc}
              </p>
            </div>
          );

          return subject.isReady ? (
            <Link key={subject.id} href={subject.href} className="group cursor-pointer">
              {CardContent}
            </Link>
          ) : (
            <div key={subject.id} className="cursor-not-allowed">
              {CardContent}
            </div>
          );
        })}
      </div>
    </main>
  );
}