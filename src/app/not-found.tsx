// src/app/not-found.tsx
import Link from 'next/link';
import { AlertCircle, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center relative z-10 overflow-hidden py-20">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-brand-400/10 dark:bg-brand-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="flex items-center justify-center w-20 h-20 bg-rose-100 dark:bg-rose-500/10 rounded-3xl mb-8 shadow-sm border border-rose-200 dark:border-rose-500/20 rotate-3 hover:rotate-0 transition-transform duration-300">
        <AlertCircle className="w-10 h-10 text-rose-600 dark:text-rose-500" />
      </div>

      <h1 className="text-8xl md:text-9xl font-extrabold mb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-blue-600 dark:from-brand-400 dark:to-blue-500 drop-shadow-sm">
        404
      </h1>

      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
        Page Not Found
      </h2>

      <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-10 leading-relaxed font-medium">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 px-8 py-4 w-full sm:w-auto bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold transition-all duration-300 shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 hover:-translate-y-0.5"
        >
          <Home className="w-5 h-5" /> Return Home
        </Link>
        
        <Link
          href="/contact"
          className="flex items-center justify-center gap-2 px-8 py-4 w-full sm:w-auto bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold transition-all duration-300 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}