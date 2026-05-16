// src/app/[lang]/[subject]/[lesson]/page.tsx

import { getLessonContent } from "@/lib/content";
import { navigationConfig } from "@/config/navigation";
import { notFound } from "next/navigation";
import { Book, Lock } from "lucide-react";
import TableOfContents from "@/components/layout/TableOfContents";
import MarkdownRenderer from "@/components/markdown/MarkdownRenderer";

export default async function LessonPage({
  params,
}: {
  // params मध्ये आता 'lang' सुद्धा आला आहे!
  params: Promise<{ lang: string; subject: string; lesson: string }>;
}) {
  const resolvedParams = await params;
  const { lang, subject, lesson } = resolvedParams;

  // lang पास करून कंटेंट आणणे
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

  return (
    <main className="flex-1 w-full min-w-0 flex">
      {/* डावीकडील मुख्य Content */}
      <div className="flex-1 min-w-0 max-w-4xl mx-auto xl:mx-0 xl:mr-8 px-4 sm:px-8 py-8 lg:py-12 pb-24">
        <div className="prose prose-lg max-w-none break-words text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-semibold text-sm uppercase tracking-wider">
                <Book className="w-4 h-4" /> {subjectConfig.title}
              </div>

              {currentLessonConfig?.accessTier && currentLessonConfig.accessTier !== "free" && (
                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-full flex items-center gap-1">
                  <Lock className="w-3 h-3" /> {currentLessonConfig.accessTier}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
              {/* जर frontmatter मध्ये टायटल असेल, तर ते घेईल, नाहीतर config मधले (हे भाषेनुसार बदलण्यासाठी उपयुक्त ठरेल) */}
              {lessonData.frontmatter.title || currentLessonConfig?.title}
            </h1>

            {lessonData.frontmatter.description && (
              <p className="text-xl text-slate-500 dark:text-slate-400 font-medium">
                {lessonData.frontmatter.description}
              </p>
            )}
          </div>

          {/* तुझा प्रीमियम MDX रेंडरर */}
          <MarkdownRenderer content={lessonData.content} />
          
        </div>
      </div>

      {/* उजवीकडील Table of Contents */}
      <TableOfContents />
    </main>
  );
}