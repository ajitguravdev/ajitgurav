// src/app/[subject]/page.tsx

import { redirect, notFound } from "next/navigation";
import { navigationConfig } from "@/config/navigation";

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const resolvedParams = await params;
  const { subject } = resolvedParams;

  // navigation.ts मध्ये विषय शोधा
  const subjectData = navigationConfig.subjects.find((sub) => sub.slug === subject);

  if (!subjectData || subjectData.groups.length === 0 || subjectData.groups[0].lessons.length === 0) {
    notFound();
  }

  // पहिल्या ग्रुपमधील पहिल्या धड्याचा slug (उदा. 'default')
  const firstLessonSlug = subjectData.groups[0].lessons[0].slug;

  // त्या पहिल्या धड्यावर रिडायरेक्ट करणे
  redirect(`/${subject}/${firstLessonSlug}`);
}