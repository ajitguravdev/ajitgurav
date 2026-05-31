// src/components/markdown/CodeRenderer.tsx
"use client";
import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown"; 
import { UnicodeDiagram } from "./UnicodeDiagram";
import { ListCards, AlertBox, TakeawayBox, IntroBox } from "./CustomBlocks";
import { Check, Copy } from "lucide-react"; // 🔴 कॉपी बटणसाठी आयकॉन्स

export const CodeRenderer = ({ className, children, lessonZones, ...props }: any) => {
  const match = /language-([a-zA-Z0-9-]+)/.exec(className || "");
  const language = match ? match[1] : "";
  const fullContent = String(children).replace(/\n$/, "");

  // 🔴 जादुई लॉजिक: ||| च्या आधारे कोड आणि स्पष्टीकरण वेगळे करणे
  const parts = fullContent.split("|||");
  const rawCode = parts[0].trim();
  const caption = parts.length > 1 ? parts[1].trim() : null;

  // कॉपी बटण स्टेट
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(rawCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (match) {
    // १. डायग्राम्स (आता आपण caption सुद्धा पास करत आहोत)
    if (language.startsWith("diagram-")) {
      const diagramId = language.replace("diagram-", "");
      const currentZones = lessonZones ? lessonZones[diagramId] : [];
      return <UnicodeDiagram diagram={rawCode} diagramId={diagramId} zones={currentZones} caption={caption} />;
    }

    // २. Intro Box
    if (language.startsWith("intro")) {
      return (
        <IntroBox>
          <ReactMarkdown>{rawCode}</ReactMarkdown>
        </IntroBox>
      );
    }

    // ३. कार्ड्स
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

    // 🔴 ६. नॉर्मल कोडिंग (Tailwind Docs + Instagram Card Style)
    const isTerminal = ["bash", "sh", "shell", "zsh", "cmd"].includes(language);
    const headerTitle = isTerminal ? "Terminal" : language.toUpperCase();

    return (
      <div className="not-prose my-[var(--space-lg)] w-full max-w-full rounded-xl bg-[#030712] border border-white/10 shadow-2xl relative group overflow-hidden flex flex-col">
        
        {/* Top Header & Code Area */}
        <div className="rounded-xl p-1 flex flex-col">
          <div className="relative flex items-center justify-between px-3 pt-1 pb-1.5">
            <div className="text-[13px] font-mono text-slate-400 font-medium tracking-wide">
              {headerTitle}
            </div>
            <button 
              onClick={handleCopy}
              className="flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-white/10 text-slate-400 hover:text-slate-200 focus:outline-none"
              title="Copy to clipboard"
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />}
            </button>
          </div>

          <div className="rounded-lg bg-white/5 border border-white/5 overflow-x-auto custom-scrollbar p-5 w-full">
            <SyntaxHighlighter
              language={language}
              style={vscDarkPlus as any}
              PreTag="div"
              customStyle={{ margin: 0, padding: 0, background: "transparent", overflowX: "auto", maxWidth: "100%" }}
              codeTagProps={{ className: "font-mono text-[14px] leading-relaxed" }}>
              {rawCode}
            </SyntaxHighlighter>
          </div>
        </div>

        {/* 🔴 Bottom Caption Area (जर ||| नंतर मजकूर असेल तरच दिसेल) */}
        {caption && (
          <div className="border-t border-white/10 bg-[#0d1117] px-5 py-4 text-[14.5px] leading-relaxed text-[var(--text-muted)] dark:text-slate-300">
            <ReactMarkdown>{caption}</ReactMarkdown>
          </div>
        )}
      </div>
    );
  }

  // सिंगल लाईन कोड
  return <code className="bg-[var(--inline-code-bg)] text-[var(--inline-code-text)] px-1.5 py-0.5 rounded font-mono text-sm font-semibold break-words" {...props}>{children}</code>;
};