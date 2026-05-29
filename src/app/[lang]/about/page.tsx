// src/app/[lang]/about/page.tsx
import { Lightbulb, Users } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/lib/dictionary";

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
    <main className="max-w-4xl mx-auto px-6 py-16 lg:py-24 transition-colors duration-300">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--text-main)] mb-6">
          {dict.about.title} <span className="text-[var(--brand-main)]">{siteConfig.name}</span>
        </h1>
        <p className="text-xl text-[var(--text-muted)] max-w-2xl mx-auto">
          {dict.about.subtitle}
        </p>
      </div>

      <div className="prose prose-lg max-w-none text-[var(--text-muted)] leading-relaxed">
        
        <div className="bg-[var(--bg-surface)] p-8 rounded-2xl shadow-[var(--shadow-base)] border border-[var(--border-base)] mb-10">
          <h2 className="text-2xl font-bold flex items-center gap-3 mt-0 text-[var(--text-main)]">
            <Users className="text-[var(--brand-main)]" /> {dict.about.who_we_are}
          </h2>
          <p>
            {dict.about.greeting} <strong className="text-[var(--text-main)]">{siteConfig.name}</strong> {dict.about.welcome_msg}{" "}
            <strong className="text-[var(--text-main)]">{dict.about.creator}</strong> {dict.about.creator_desc}
          </p>
          <p>
            {dict.about.p2}
          </p>
        </div>

        {/* Brand Theme Box */}
        <div className="bg-[var(--brand-light)] p-8 rounded-2xl border border-[var(--brand-main)]/30">
          <h2 className="text-2xl font-bold flex items-center gap-3 mt-0 text-[var(--text-main)]">
            <Lightbulb className="text-[var(--brand-main)]" /> {dict.about.mission}
          </h2>
          <p className="mb-0 text-[var(--text-main)] font-medium">
            {dict.about.mission_desc}
          </p>
        </div>
        
      </div>
    </main>
  );
}