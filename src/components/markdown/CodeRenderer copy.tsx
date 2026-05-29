import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown"; 
import { UnicodeDiagram } from "./UnicodeDiagram";
import { ListCards, AlertBox, TakeawayBox, IntroBox } from "./CustomBlocks"; // 🔴 IntroBox ॲड केले

export const CodeRenderer = ({ className, children, lessonZones, ...props }: any) => {
  const match = /language-([a-zA-Z0-9-]+)/.exec(className || "");
  const language = match ? match[1] : "";
  const rawCode = String(children).replace(/\n$/, "");

  if (match) {
    // १. डायग्राम्स
    if (language.startsWith("diagram-")) {
      const diagramId = language.replace("diagram-", "");
      const currentZones = lessonZones ? lessonZones[diagramId] : [];
      return <UnicodeDiagram diagram={rawCode} diagramId={diagramId} zones={currentZones} />;
    }

    // 🔴 २. नवीन: Intro Box (प्रस्तावना)
    if (language.startsWith("intro")) {
      return (
        <IntroBox>
          <ReactMarkdown>{rawCode}</ReactMarkdown>
        </IntroBox>
      );
    }

    // ३. कार्ड्स (cards-2, cards-3)
    if (language.startsWith("cards-")) {
      const cols = language.replace("cards-", "");
      return (
        <ListCards cols={cols}>
          <ReactMarkdown>{rawCode}</ReactMarkdown>
        </ListCards>
      );
    }

    // ४. ॲलर्ट बॉक्सेस
    if (language.startsWith("alert-")) {
      const alertType = language.replace("alert-", ""); 
      return (
        <AlertBox type={alertType}>
          <ReactMarkdown>{rawCode}</ReactMarkdown>
        </AlertBox>
      );
    }

    // ५. Key Takeaway
    if (language.startsWith("key-takeaway")) {
      return (
        <TakeawayBox>
          <ReactMarkdown>{rawCode}</ReactMarkdown>
        </TakeawayBox>
      );
    }

    // ६. नॉर्मल कोडिंग (उदा. javascript)
    return (
      <div className="not-prose mt-6 mb-8 w-full max-w-full rounded-xl overflow-hidden shadow-[var(--shadow-base)] border border-[var(--border-base)] bg-[#0d1117] relative group">
        <div className="flex items-center px-4 py-3 bg-[#010409] border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="ml-4 text-xs font-mono text-slate-400 font-medium tracking-wide uppercase">
              {language}
            </span>
          </div>
        </div>
        <div className="code-container overflow-x-auto custom-scrollbar p-5 w-full">
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus as any}
            PreTag="div"
            customStyle={{ margin: 0, padding: 0, background: "transparent", overflowX: "auto", maxWidth: "100%" }}
            codeTagProps={{ className: "font-mono text-sm leading-relaxed" }}>
            {rawCode}
          </SyntaxHighlighter>
        </div>
      </div>
    );
  }

  // सिंगल लाईन कोड
  return <code className="bg-[var(--inline-code-bg)] text-[var(--inline-code-text)] px-1.5 py-0.5 rounded font-mono text-sm font-semibold break-words" {...props}>{children}</code>;
};