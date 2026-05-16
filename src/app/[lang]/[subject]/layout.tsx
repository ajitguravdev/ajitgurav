import Sidebar from "@/components/layout/Sidebar";
import { navigationConfig } from "@/config/navigation";
import { notFound } from "next/navigation";

export default async function SubjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ subject: string }>;
}) {
  const resolvedParams = await params;
  const { subject } = resolvedParams;
  
  const subjectData = navigationConfig.subjects.find((sub) => sub.slug === subject);

  if (!subjectData) {
    notFound();
  }

  return (
    <div className="flex flex-1 w-full relative">
      <Sidebar subject={subjectData} />
      <div className="flex-1 w-full min-w-0">
        {children}
      </div>
    </div>
  );
}