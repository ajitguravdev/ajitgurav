// src/app/[lang]/[subject]/[lesson]/page.tsx

import { getLessonContent } from "@/lib/content";
import { navigationConfig } from "@/config/navigation";
import { notFound } from "next/navigation";
import { Book, Lock } from "lucide-react";
import TableOfContents from "@/components/layout/TableOfContents";
import MarkdownRenderer from "@/components/markdown/MarkdownRenderer";

// 🔴 हे फंक्शन इथेच असणे गरजेचे आहे (SEO आणि शेअरिंगसाठी)
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string; subject: string; lesson: string }> 
}) {
  const resolvedParams = await params;
  const { lang, subject, lesson } = resolvedParams;
  const lessonData = getLessonContent(lang, subject, lesson);

  const title = lessonData?.frontmatter?.title || "Coding Lesson";
  const description = lessonData?.frontmatter?.description || "AJDevIT वर मराठीतून कोडिंग शिका.";

  return {
    title: `${title} | AJDevIT`,
    description: description,
    openGraph: {
      title: `${title} | AJDevIT`,
      description: description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | AJDevIT`,
      description: description,
    },
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lang: string; subject: string; lesson: string }>;
}) {
  const resolvedParams = await params;
  const { lang, subject, lesson } = resolvedParams;

  // १. धड्याचा मुख्य (MDX) कंटेंट मिळवणे
  const lessonData = getLessonContent(lang, subject, lesson);
  const subjectConfig = navigationConfig.subjects.find((s) => s.slug === subject);

  if (!lessonData || !subjectConfig) {
    notFound();
  }

  let currentLessonConfig: any = null;
  subjectConfig.groups.forEach((group) => {
    const found = group.lessons.find((l) => l.slug === lesson);
    if (found) currentLessonConfig = found;
  });

  // 🔴 २. डायनॅमिक Config इम्पोर्ट (येथे आपण झोन्स आणि ॲनिमेशन कंपोनंट्स मिळवत आहोत)
  let lessonZones = {};
  let visualComponents = {}; // ॲनिमेशन्स साठवण्यासाठी नवीन व्हेरिएबल

  try {
    const configModule = await import(`@/config/lessons/${subject}/${lesson}`);
    
    // फाईलमधील lessonZones वेगळे काढणे आणि उरलेले सर्व (rest) ॲनिमेशन्स म्हणून घेणे
    const { lessonZones: importedZones, ...restComponents } = configModule;
    
    if (importedZones) {
      lessonZones = importedZones;
    }
    // उरलेले सर्व एक्सपोर्ट्स (उदा. AI ॲनिमेशन्स) आपण MDX ला पाठवण्यासाठी सेव्ह करू
    visualComponents = restComponents; 

  } catch (error) {
    // जर config फाईल नसेल, तर क्रॅश होणार नाही.
  }

  return (
    <main className="flex-1 w-full min-w-0 flex bg-[var(--bg-base)] transition-colors duration-300">
      
      {/* डावीकडील मुख्य Content */}
      <div className="bg-tech-grid flex-1 min-w-0 max-w-4xl px-4 sm:px-8 py-8 lg:py-12 pb-24">
        {/* --- Page Header --- */}
        <div className="mb-10 pb-6 border-b border-[var(--border-strong)]">
          <div className="flex items-center justify-between mb-4">
            
            <div className="flex items-center gap-2 text-[var(--text-muted)] font-semibold text-sm uppercase tracking-wider">
              <Book className="w-4 h-4" /> {subjectConfig.title}
            </div>

            {currentLessonConfig?.accessTier && currentLessonConfig.accessTier !== "free" && (
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-[var(--color-warning)]/10 text-[var(--color-warning)] border border-[var(--color-warning)]/20 rounded-full flex items-center gap-1">
                <Lock className="w-3 h-3" /> {currentLessonConfig.accessTier}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-medium text-[var(--text-strong)] mb-4">
            {lessonData.frontmatter.title || currentLessonConfig?.title}
          </h1>

          {lessonData.frontmatter.description && (
            <p className="text-xl text-[var(--text-muted)] font-medium">
              {lessonData.frontmatter.description}
            </p>
          )}
        </div>

        {/* --- MDX Content --- */}
        <div className="mdx-wrapper prose max-w-none break-words
          prose-headings:!text-[var(--text-main)] prose-headings:font-bold
          prose-p:!text-[var(--text-muted)] prose-p:leading-relaxed
          prose-strong:!text-[var(--text-main)]
          prose-a:!text-[var(--brand-main)] hover:prose-a:underline
          prose-ul:!text-[var(--text-muted)] prose-li:marker:!text-[var(--brand-main)]
          prose-blockquote:border-l-[var(--brand-main)] prose-blockquote:bg-[var(--bg-surface)] prose-blockquote:!text-[var(--text-main)]
          prose-hr:border-[var(--border-base)] dark:prose-invert"
        >
          {/* 🔴 ३. इथे आपण lessonZones सोबत visualComponents सुद्धा पाठवत आहोत */}
          <MarkdownRenderer 
             content={lessonData.content} 
             lessonZones={lessonZones} 
             visualComponents={visualComponents} 
          />
        </div>
        
      </div>

      {/* उजवीकडील Table of Contents */}
      <TableOfContents />
    </main>
  );
}