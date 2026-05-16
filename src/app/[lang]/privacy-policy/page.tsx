// src/app/[lang]/privacy-policy/page.tsx

import { getDictionary } from "@/lib/dictionary";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  return {
    title: `Privacy Policy | ${siteConfig.name}`,
    description: `Privacy Policy and Terms of Service for ${siteConfig.name}.`,
  };
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang as "en" | "mr" | "hi");

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 lg:py-20">
      <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-8 border-b border-slate-200 dark:border-slate-800 pb-6">
        {dict.privacy.title} <span className="text-slate-400 dark:text-slate-500 text-2xl md:text-4xl">{dict.privacy.subtitle}</span>
      </h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
        <p className="text-sm text-slate-400 mb-8"><strong>{dict.privacy.last_updated}</strong></p>

        <p>{dict.privacy.intro}</p>

        <h3>{dict.privacy.s1_title}</h3>
        <ul>
          <li><strong>Personal Data:</strong> {dict.privacy.s1_l1}</li>
          <li><strong>Technical Data:</strong> {dict.privacy.s1_l2}</li>
        </ul>

        <h3>{dict.privacy.s2_title}</h3>
        <p>{dict.privacy.s2_desc}</p>

        <h3>{dict.privacy.s3_title}</h3>
        <p>{dict.privacy.s3_desc}</p>
        <ul>
          <li>{dict.privacy.s3_l1}</li>
          <li>{dict.privacy.s3_l2}</li>
          <li>{dict.privacy.s3_l3}</li>
        </ul>

        <h3>{dict.privacy.s4_title}</h3>
        <p>{dict.privacy.s4_desc}</p>

        <h3>{dict.privacy.s5_title}</h3>
        <p>{dict.privacy.s5_desc}</p>

        <h3>{dict.privacy.s6_title}</h3>
        <p>{dict.privacy.s6_desc}</p>

        <hr className="my-10 border-slate-200 dark:border-slate-800" />
        
        <p>
          {dict.privacy.footer} <strong><Link href={`/${resolvedParams.lang}/contact`} className="text-brand-600 dark:text-brand-400">{dict.privacy.contact_link}</Link></strong> {dict.privacy.footer_end}
        </p>
      </div>
    </main>
  );
}