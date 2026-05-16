// src/app/[lang]/page.tsx

import Link from "next/link";
import { Terminal, BookOpen, Code, Database } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/lib/dictionary";

// params आता Promise म्हणून घ्यावे लागतील
export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  // १. params ला await करणे (हीच ती चूक होती जी आपण दुरुस्त केली!)
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  // २. आता योग्य lang (उदा. "en" किंवा "hi") डिक्शनरीला पास होईल
  const dict = await getDictionary(lang as "en" | "mr" | "hi");

  return (
    <main className="flex-1 w-full px-4 sm:px-8 py-12 lg:py-24 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 font-medium text-sm mb-6 border border-brand-100 dark:border-brand-800">
          <Terminal className="w-4 h-4" />
          {/* डिक्शनरीमधून शब्द */}
          {lang === "en"
            ? `${dict.home.welcome} ${siteConfig.name}`
            : `${siteConfig.name} ${dict.home.welcome}`}
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
          {dict.home.title_part1}{" "}
          <span className="text-brand-500">{dict.home.title_highlight1}</span>
          {dict.home.title_part2}{" "}
          <span className="text-blue-500">{dict.home.title_highlight2}</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">
          {dict.home.description}
        </p>

        <Link
          href={`/${lang}/computer-memory/intro`}
          className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-brand-600 border border-transparent rounded-xl hover:bg-brand-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-600">
          {dict.home.cta}
        </Link>
      </div>

      {/* Feature / Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Subject Card 1 */}
        <Link
          href={`/${lang}/computer-memory/intro`}
          className="group">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-brand-300 dark:hover:border-brand-700 transition-all h-full">
            <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900/50 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              {dict.home.subject1_title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              {dict.home.subject1_desc}
            </p>
          </div>
        </Link>
        
        {/* Subject Card 2 */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm opacity-75 cursor-not-allowed h-full">
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
            <Code className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex justify-between items-center">
            JavaScript{" "}
            <span className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-slate-500">
              {dict.home.coming_soon}
            </span>
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            V8 Engine, Event Loop & Promises
          </p>
        </div>

        {/* Subject Card 3 */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm opacity-75 cursor-not-allowed h-full">
          <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-6">
            <Database className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex justify-between items-center">
            Data Structures{" "}
            <span className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-slate-500">
              {dict.home.coming_soon}
            </span>
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Arrays, Linked Lists, Trees & Algorithms
          </p>
        </div>
      </div>
    </main>
  );
}