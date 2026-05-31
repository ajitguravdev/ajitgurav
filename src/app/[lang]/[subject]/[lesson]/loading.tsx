// src/app/[lang]/[subject]/[lesson]/loading.tsx

export default function LessonLoading() {
  return (
    <main className="flex-1 w-full min-w-0 flex bg-[var(--bg-base)]">
      {/* 🔴 मुख्य साचा (Skeleton) */}
      <div className="flex-1 min-w-0 max-w-4xl px-4 sm:px-8 py-8 lg:py-12 pb-24">
        
        {/* --- Header Skeleton --- */}
        {/* animate-pulse मुळे हे लुकलुकत राहील (Loading effect) */}
        <div className="mb-10 pb-6 border-b border-[var(--border-base)] animate-pulse">
          {/* Subject Title Placeholder */}
          <div className="h-4 w-32 bg-[var(--border-base)] rounded mb-4"></div>
          {/* Main Heading Placeholder */}
          <div className="h-10 w-3/4 bg-[var(--border-base)] rounded mb-4"></div>
          {/* Description Placeholder */}
          <div className="h-6 w-1/2 bg-[var(--border-base)] rounded"></div>
        </div>

        {/* --- MDX Content Skeleton --- */}
        <div className="space-y-4 animate-pulse">
          {/* Paragraph 1 */}
          <div className="h-4 bg-[var(--border-base)] rounded w-full"></div>
          <div className="h-4 bg-[var(--border-base)] rounded w-11/12"></div>
          <div className="h-4 bg-[var(--border-base)] rounded w-4/5"></div>
          
          {/* Code Block Placeholder (मोठा डबा) */}
          <div className="h-48 bg-[var(--border-base)] rounded-xl w-full my-8"></div>
          
          {/* Paragraph 2 */}
          <div className="h-4 bg-[var(--border-base)] rounded w-full"></div>
          <div className="h-4 bg-[var(--border-base)] rounded w-5/6"></div>
          <div className="h-4 bg-[var(--border-base)] rounded w-3/4"></div>
        </div>
        
      </div>
      
      {/* उजवीकडील Table of Contents Skeleton (मोठ्या स्क्रीनसाठी) */}
      <div className="hidden xl:block w-64 flex-shrink-0 pt-8 animate-pulse">
        <div className="h-4 w-24 bg-[var(--border-base)] rounded mb-6"></div>
        <div className="space-y-4">
          <div className="h-3 bg-[var(--border-base)] rounded w-full"></div>
          <div className="h-3 bg-[var(--border-base)] rounded w-5/6"></div>
          <div className="h-3 bg-[var(--border-base)] rounded w-4/5"></div>
        </div>
      </div>
    </main>
  );
}