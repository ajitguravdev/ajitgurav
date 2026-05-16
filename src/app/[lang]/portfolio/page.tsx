// src/app/[lang]/portfolio/page.tsx

import { getDictionary } from "@/lib/dictionary";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { Terminal, Code2, Database, Box, Server, Smartphone, ExternalLink, Mail } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  return {
    title: `Portfolio | ${siteConfig.name}`,
    description: `Professional portfolio and projects of Ajit Gurav.`,
  };
}

export default async function PortfolioPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang as "en" | "mr" | "hi");

  return (
    <main className="max-w-5xl mx-auto px-6 py-16 lg:py-24">
      {/* Hero Section */}
      <section className="text-center mb-20 relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-100/50 via-transparent to-transparent dark:from-brand-900/20 dark:via-transparent dark:to-transparent blur-3xl"></div>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-sm mb-8 border border-slate-200 dark:border-slate-700 shadow-sm">
          <Terminal className="w-4 h-4 text-brand-500" />
          {dict.portfolio.title}
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
          {dict.portfolio.greeting}
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-bold text-brand-600 dark:text-brand-400 mb-6">
          {dict.portfolio.role}
        </h2>
        
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
          {dict.portfolio.bio}
        </p>
      </section>

      {/* Tech Stack Section */}
      <section className="mb-24">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 justify-center md:justify-start">
          <Code2 className="w-6 h-6 text-brand-500" /> {dict.portfolio.skills_title}
        </h3>
        
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          {["JavaScript (V8 Internals)", "Next.js 15", "React.js", "C / C++", "PHP", "MySQL", "MongoDB", "Tailwind CSS", "Bootstrap"].map((skill) => (
            <span key={skill} className="px-4 py-2 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 font-medium shadow-sm hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors cursor-default">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="mb-24">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 justify-center md:justify-start">
          <Box className="w-6 h-6 text-brand-500" /> {dict.portfolio.projects_title}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project 1 */}
          <div className="bg-white dark:bg-slate-800/60 p-8 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm hover:shadow-md hover:border-brand-400 dark:hover:border-brand-600 transition-all backdrop-blur-sm group">
            <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900/50 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-6">
              <Code2 className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
              {dict.portfolio.proj1_title}
            </h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {dict.portfolio.proj1_desc}
            </p>
          </div>

          {/* Project 2 */}
          <div className="bg-white dark:bg-slate-800/60 p-8 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm hover:shadow-md hover:border-brand-400 dark:hover:border-brand-600 transition-all backdrop-blur-sm group">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
              <Database className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {dict.portfolio.proj2_title}
            </h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {dict.portfolio.proj2_desc}
            </p>
          </div>

          {/* Project 3 */}
          <div className="bg-white dark:bg-slate-800/60 p-8 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm hover:shadow-md hover:border-brand-400 dark:hover:border-brand-600 transition-all backdrop-blur-sm group">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
              <Smartphone className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {dict.portfolio.proj3_title}
            </h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {dict.portfolio.proj3_desc}
            </p>
          </div>

          {/* Project 4 */}
          <div className="bg-white dark:bg-slate-800/60 p-8 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm hover:shadow-md hover:border-brand-400 dark:hover:border-brand-600 transition-all backdrop-blur-sm group">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6">
              <Box className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              {dict.portfolio.proj4_title}
            </h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {dict.portfolio.proj4_desc}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-brand-50 dark:bg-brand-900/20 p-10 md:p-16 rounded-3xl border border-brand-100 dark:border-brand-800/50">
        <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
          {dict.portfolio.cta_title}
        </h3>
        <Link 
          href={`/${resolvedParams.lang}/contact`}
          className="inline-flex items-center gap-2 justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-brand-600 border border-transparent rounded-xl hover:bg-brand-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-600"
        >
          <Mail className="w-5 h-5" /> {dict.portfolio.cta_btn}
        </Link>
      </section>
    </main>
  );
}