"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    // १. पेजवरील सर्व h2 आणि h3 टॅग्स शोधणे (जे .prose क्लासच्या आत आहेत)
    const elements = Array.from(document.querySelectorAll(".prose h2, .prose h3"));

    const parsedHeadings: Heading[] = elements.map((elem) => {
      // जर टॅगला ID नसेल, तर त्याच्या नावावरून आपोआप ID तयार करणे
      if (!elem.id) {
        // मराठी शब्दांसाठी आणि स्पेस काढण्यासाठी Regex
        const generatedId = elem.textContent?.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\u0900-\u097F-]+/g, '') || "section";
        elem.id = generatedId;
      }
      return {
        id: elem.id,
        text: elem.textContent || "",
        level: elem.tagName === "H2" ? 2 : 3,
      };
    });

    setHeadings(parsedHeadings);

    // २. Scroll ट्रॅक करण्यासाठी IntersectionObserver चा वापर
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      // हे पेजच्या वरच्या बाजूला heading आल्यावरच ऍक्टिव्ह करेल
      { rootMargin: "0px 0px -80% 0px" } 
    );

    elements.forEach((elem) => observer.observe(elem));

    return () => observer.disconnect();
  }, [pathname]); // जेव्हा पेज (धडा) बदलेल, तेव्हा हे पुन्हा चालेल

  // जर पेजवर कोणतेच Headings नसतील, तर हा साईडबार दिसणार नाही
  if (headings.length === 0) return null;

  return (
    <aside className="hidden xl:block w-64 shrink-0 sticky top-26 h-[calc(100vh-6.5rem)] overflow-y-auto custom-scrollbar py-8 px-6 border-l border-slate-200 dark:border-slate-800">
      <h4 className="font-bold text-slate-900 dark:text-white mb-4 text-sm uppercase tracking-wider">On this page</h4>
      <nav className="flex flex-col text-sm text-slate-500 dark:text-slate-400 border-l border-slate-200 dark:border-slate-800">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault();
              // Smooth Scroll चे लॉजिक
              document.getElementById(heading.id)?.scrollIntoView({ behavior: "smooth" });
              // URL मध्ये #id ऍड करणे (जेणेकरून लिंक शेअर करता येईल)
              window.history.pushState(null, "", `#${heading.id}`);
            }}
            className={`py-1.5 border-l-2 transition-all ${
              heading.level === 3 ? "pl-6 text-xs" : "pl-3 font-medium"
            } ${
              activeId === heading.id
                ? "border-brand-500 text-brand-600 dark:text-brand-400 -ml-px"
                : "border-transparent hover:border-slate-400 dark:hover:text-slate-200 -ml-px"
            }`}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </aside>
  );
}