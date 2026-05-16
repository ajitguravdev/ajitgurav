// src/components/markdown/MagicBox.tsx
import React from 'react';

export default function MagicBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-12 relative rounded-2xl bg-white dark:bg-[#151822] border border-slate-200 dark:border-slate-700/80 p-6 sm:p-10 shadow-2xl overflow-hidden group [&>h2:first-child]:mt-0 [&>h2:first-child]:border-none [&>h2:first-child]:text-brand-600 dark:[&>h2:first-child]:text-brand-400">
      {/* वरची रंगीत बॉर्डर (Gradient) */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-500 via-purple-500 to-amber-500 opacity-90"></div>
      
      {/* बॅकग्राउंड ग्लो इफेक्ट */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-500/10 blur-[60px] rounded-full pointer-events-none transition-all group-hover:bg-brand-500/20"></div>
      
      {/* मुख्य कंटेंट */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}