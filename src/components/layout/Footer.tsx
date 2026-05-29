// src/components/layout/Footer.tsx
import Link from "next/link";
import { Terminal, Mail, Heart, ChevronRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--bg-surface)] border-t border-[var(--border-base)] transition-colors duration-300 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          
          {/* १. ब्रँड आणि माहिती */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 inline-flex">
              <Terminal className="w-6 h-6 text-[var(--brand-main)]" />
              <span className="font-extrabold text-xl tracking-wide text-[var(--text-main)]">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6 max-w-sm">
              {siteConfig.description}
            </p>
            <a 
              href={`mailto:${siteConfig.email}`} 
              className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--brand-main)] transition-colors"
            >
              <Mail className="w-4 h-4 mt-0.5" /> {siteConfig.email}
            </a>
          </div>

          {/* २. महत्त्वाच्या लिंक्स (Quick Links) */}
          <div>
            <h3 className="font-bold text-[var(--text-main)] mb-4 uppercase tracking-wider text-sm">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--brand-main)] transition-colors">
                  <ChevronRight className="w-4 h-4" /> About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--brand-main)] transition-colors">
                  <ChevronRight className="w-4 h-4" /> Contact
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--brand-main)] transition-colors">
                  <ChevronRight className="w-4 h-4" /> Portfolio
                </Link>
              </li>
            </ul>
          </div>

          {/* ३. कायदेशीर लिंक्स (Legal) */}
          <div>
            <h3 className="font-bold text-[var(--text-main)] mb-4 uppercase tracking-wider text-sm">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy-policy" className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--brand-main)] transition-colors">
                  <ChevronRight className="w-4 h-4" /> Privacy Policy
                </Link>
              </li>
              {/* <li>
                <Link href="/terms" className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--brand-main)] transition-colors">
                  <ChevronRight className="w-4 h-4" /> Terms of Service
                </Link>
              </li> */}
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--border-base)] mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--text-muted)]">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-sm text-[var(--text-muted)] flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> in Maharashtra, India.
          </p>
        </div>
      </div>
    </footer>
  );
}