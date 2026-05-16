// src/components/layout/Footer.tsx
import Link from "next/link";
import { Terminal, Mail, Heart } from "lucide-react";
import { siteConfig } from "@/config/site"; // आपली नवीन कॉन्फिग फाईल

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-[#0f111a] border-t border-slate-200 dark:border-slate-800 transition-colors duration-300 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          
          {/* १. ब्रँड आणि माहिती */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 inline-flex">
              <Terminal className="w-6 h-6 text-brand-600 dark:text-brand-400" />
              <span className="font-extrabold text-xl tracking-wide text-slate-900 dark:text-white">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              {siteConfig.description}
            </p>
            <a 
              href={`mailto:${siteConfig.email}`} 
              className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              <Mail className="w-4 h-4" /> {siteConfig.email}
            </a>
          </div>

          {/* २. महत्त्वाच्या लिंक्स (Quick Links) */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider text-sm">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Portfolio
                </Link>
              </li>
            </ul>
          </div>

          {/* ३. कायदेशीर लिंक्स (Legal) - इथे Privacy Policy आहे */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider text-sm">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy-policy" className="text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              {/* <li>
                <Link href="/terms" className="text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Terms of Service
                </Link>
              </li> */}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> in Maharashtra, India.
          </p>
        </div>
      </div>
    </footer>
  );
}