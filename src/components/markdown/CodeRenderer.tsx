import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { highlightDiagram } from "@/lib/diagramEngine";

export const CodeRenderer = ({ className, children, ...props }: any) => {
  const match = /language-([a-zA-Z0-9-]+)/.exec(className || "");
  const language = match ? match[1] : "";

  if (match) {
    const isDiagram = language.startsWith("diagram");

    return (
      <div className="not-prose mt-6 mb-8 w-full max-w-full rounded-xl overflow-hidden shadow-2xl bg-[#0f111a] border border-slate-700 dark:border-slate-600 relative group">
        <div className="flex items-center px-4 py-3 bg-[#1a1d27] border-b border-slate-700/50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="ml-4 text-xs font-mono text-slate-400 font-medium tracking-wide uppercase">
              {isDiagram ? "ASCII Visualizer" : language}
            </span>
          </div>
        </div>

        <div className="code-container overflow-x-auto custom-scrollbar p-5 w-full">
          {isDiagram ? (
            <pre 
              className="font-mono text-sm leading-relaxed min-w-full inline-block text-slate-300"
              dangerouslySetInnerHTML={{ __html: highlightDiagram(children as string, language) }}
            />
          ) : (
            <SyntaxHighlighter
              language={language}
              style={vscDarkPlus as any}
              PreTag="div"
              customStyle={{ margin: 0, padding: 0, background: "transparent", overflowX: "auto", maxWidth: "100%" }}
              codeTagProps={{ className: "font-mono text-sm leading-relaxed" }}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          )}
        </div>
      </div>
    );
  }

  return (
    <code className="bg-slate-200 dark:bg-slate-800 text-brand-700 dark:text-brand-400 px-1.5 py-0.5 rounded font-mono text-sm font-semibold break-words" {...props}>
      {children}
    </code>
  );
};