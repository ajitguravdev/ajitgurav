import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { UnicodeDiagram } from "./UnicodeDiagram";
import { CodeRenderer } from "./CodeRenderer";
import { ListCards } from "./CustomBlocks"; // 🔴 बाकीचे Imports काढून टाकले, कारण ते आता CodeRenderer मध्ये जातात!

interface MarkdownRendererProps {
  content: string;
  lessonZones?: any; 
}

export default function MarkdownRenderer({ content, lessonZones }: MarkdownRendererProps) {
  const customComponents: any = {
    h1: (props: any) => <h1 className="text-[var(--brand-main)] font-semibold text-3xl uppercase tracking-wider" {...props} />,
    h2: (props: any) => <h2 className=" text-[var(--text-main)] font-bold text-2xl" {...props} />,
    h3: (props: any) => <h3 className="text-[var(--text-main)] font-semibold text-xl" {...props} />,
    
    p: (props: any) => <p className="text-[var(--text-main)] leading-relaxed text-[17px]" {...props} />,
    
    ul: (props: any) => <ul className="text-[var(--text-main)] text-md" {...props} />,
    ol: (props: any) => <ol className="text-[var(--text-main)] text-md" {...props} />,

    hr: (props: any) => <hr className="text-gray-600 mx-[-20px]" />,

    li: (props: any) => <li className="[&>p]:inline" {...props} />,

    blockquote: (props: any) => (
      <blockquote className="p-4 sm:p-5 border-l-4 border-[var(--brand-main)] bg-[var(--bg-surface)] text-[var(--text-main)] italic rounded-r-xl shadow-sm">
        <div className="font-medium leading-relaxed">
          {props.children}
        </div>
      </blockquote>
    ),

    pre: ({ children }: any) => <>{children}</>,
    "unicode-diagram": UnicodeDiagram,
    code: ({ className, children, ...props }: any) => (
      <CodeRenderer className={className} lessonZones={lessonZones} {...props}>
        {children}
      </CodeRenderer>
    ),
    "list-cards": ListCards,
  };

  return (
    <div className="markdown-body">
      <ReactMarkdown rehypePlugins={[rehypeRaw]} components={customComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}