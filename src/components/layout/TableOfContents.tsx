// src/components/layout/TableOfContents.tsx
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
    // फक्त h2 टॅग्स शोधणे (तू कॉमेंट केलेल्या लाईननुसार)
    const elements = Array.from(document.querySelectorAll(".prose h2"));

    const parsedHeadings: Heading[] = elements.map((elem) => {
      if (!elem.id) {
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" } 
    );

    elements.forEach((elem) => observer.observe(elem));

    return () => observer.disconnect();
  }, [pathname]);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden xl:block w-64 shrink-0 sticky top-26 h-[calc(100vh-6.5rem)] overflow-y-auto custom-scrollbar py-8 px-6 border-l border-[var(--border-base)]">
      <h4 className="font-bold text-[var(--text-main)] mb-4 text-sm uppercase tracking-wider">On this page</h4>
      
      <nav className="flex flex-col text-sm text-[var(--text-muted)] border-l border-[var(--border-base)]">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(heading.id)?.scrollIntoView({ behavior: "smooth" });
              window.history.pushState(null, "", `#${heading.id}`);
            }}
            className={`py-1.5 border-l-2 transition-all ${
              heading.level === 3 ? "pl-6 text-xs" : "pl-3 font-medium"
            } ${
              // ॲक्टिव्ह लिंक आणि होव्हरसाठी नवीन ब्रँड टोकन्स
              activeId === heading.id
                ? "border-[var(--text-strong)] text-[var(--text-strong)] -ml-px"
                : "border-transparent hover:border-[var(--text-muted)] hover:text-[var(--text-main)] -ml-px"
            }`}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </aside>
  );
}