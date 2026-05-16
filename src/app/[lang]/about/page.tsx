// src/app/[lang]/about/page.tsx

import { Lightbulb, Users } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/lib/dictionary";

// डायनॅमिक मेटाडेटा (SEO साठी)
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  return {
    title: `About Us | ${siteConfig.name}`,
    description: siteConfig.description,
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang as "en" | "mr" | "hi");

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
          {dict.about.title} <span className="text-brand-500">{siteConfig.name}</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {dict.about.subtitle}
        </p>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
        <div className="bg-white dark:bg-slate-800/50 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 mb-10">
          <h2 className="text-2xl font-bold flex items-center gap-3 mt-0">
            <Users className="text-brand-500" /> {dict.about.who_we_are}
          </h2>
          <p>
            {dict.about.greeting} <strong>{siteConfig.name}</strong> {dict.about.welcome_msg}{" "}
            <strong>{dict.about.creator}</strong> {dict.about.creator_desc}
          </p>
          <p>
            {dict.about.p2}
          </p>
        </div>

        <div className="bg-brand-50 dark:bg-brand-900/10 p-8 rounded-2xl border border-brand-100 dark:border-brand-800/30">
          <h2 className="text-2xl font-bold flex items-center gap-3 mt-0 text-slate-900 dark:text-white">
            <Lightbulb className="text-brand-500" /> {dict.about.mission}
          </h2>
          <p className="mb-0">
            {dict.about.mission_desc}
          </p>
        </div>
      </div>
    </main>
  );
}