// src/app/[lang]/contact/page.tsx
import { Mail, MessageSquare } from "lucide-react";
import { getDictionary } from "@/lib/dictionary";
import { siteConfig } from "@/config/site";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  return {
    title: `Contact Us | AJDevIt`,
    description: `Get in touch with the AJDevIt team.`,
  };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang as "en" | "mr" | "hi");

  return (
    <main className="max-w-3xl mx-auto px-6 py-16 lg:py-24 transition-colors duration-300">
      <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--text-main)] mb-6 text-center">
        {dict.contact.title} <span className="text-[var(--brand-main)]">{dict.contact.subtitle}</span>
      </h1>
      
      <p className="text-xl text-center text-[var(--text-muted)] mb-12">
        {dict.contact.desc}
      </p>

      <div className="bg-[var(--bg-surface)] p-8 md:p-10 rounded-3xl shadow-[var(--shadow-elevated)] border border-[var(--border-base)]">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-around text-center">
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-[var(--brand-light)] rounded-full flex items-center justify-center mb-4 text-[var(--brand-main)]">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">{dict.contact.email_title}</h3>
            <p className="text-[var(--text-muted)] mb-2">{dict.contact.email_desc}</p>
            <a href="mailto:admin@ajitgurav.com" className="text-[var(--brand-main)] font-bold hover:underline">
              {siteConfig.email}
            </a>
          </div>

          <div className="hidden md:block w-px h-32 bg-[var(--border-base)]"></div>

          <div className="flex flex-col items-center">
            {/* Info Color Token */}
            <div className="w-16 h-16 bg-[var(--color-info)]/10 rounded-full flex items-center justify-center mb-4 text-[var(--color-info)] border border-[var(--color-info)]/20">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">{dict.contact.reply_time}</h3>
            <p className="text-[var(--text-muted)]">
              {dict.contact.reply_desc1} <br/> 
              <strong className="text-[var(--text-main)]">{dict.contact.reply_time_highlight}</strong> <br/> 
              {dict.contact.reply_desc2}
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}