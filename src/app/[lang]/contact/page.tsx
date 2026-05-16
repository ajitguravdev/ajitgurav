// src/app/[lang]/contact/page.tsx

import { Mail, MessageSquare } from "lucide-react";
import { getDictionary } from "@/lib/dictionary";

// डायनॅमिक मेटाडेटा (SEO साठी)
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
    <main className="max-w-3xl mx-auto px-6 py-16 lg:py-24">
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 text-center">
        {dict.contact.title} <span className="text-brand-500">{dict.contact.subtitle}</span>
      </h1>
      
      <p className="text-xl text-center text-slate-600 dark:text-slate-400 mb-12">
        {dict.contact.desc}
      </p>

      <div className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-around text-center">
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mb-4 text-brand-600 dark:text-brand-400">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{dict.contact.email_title}</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-2">{dict.contact.email_desc}</p>
            <a href="mailto:admin@ajitgurav.com" className="text-brand-600 dark:text-brand-400 font-bold hover:underline">
              admin@ajitgurav.com
            </a>
          </div>

          <div className="hidden md:block w-px h-32 bg-slate-200 dark:bg-slate-700"></div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{dict.contact.reply_time}</h3>
            <p className="text-slate-500 dark:text-slate-400">
              {dict.contact.reply_desc1} <br/> 
              <strong className="text-slate-700 dark:text-slate-300">{dict.contact.reply_time_highlight}</strong> <br/> 
              {dict.contact.reply_desc2}
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}