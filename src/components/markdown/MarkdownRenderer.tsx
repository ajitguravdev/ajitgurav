// src/components/markdown/MarkdownRenderer.tsx

import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { UnicodeDiagram } from "./UnicodeDiagram";
import { CodeRenderer } from "./CodeRenderer";
import { ListCards } from "./CustomBlocks";

interface MarkdownRendererProps {
  content: string;
  lessonZones?: any; 
  visualComponents?: any; // ॲनिमेशन कंपोनंट्स घेण्यासाठी
}

export default function MarkdownRenderer({ content, lessonZones, visualComponents = {} }: MarkdownRendererProps) {
  
  // 🔴 नवीन लॉजिक: कॉन्फिग फाईलमधून आलेल्या सर्व नावांना lowercase मध्ये बदलणे
  const lowerCaseVisualComponents = Object.keys(visualComponents).reduce((acc: any, key) => {
    acc[key.toLowerCase()] = visualComponents[key];
    return acc;
  }, {});

  const customComponents: any = {
    h1: (props: any) => <h1 className="text-[var(--brand-main)] font-semibold text-3xl uppercase tracking-wider" {...props} />,
    h2: (props: any) => <h2 className="text-[var(--text-main)] font-bold text-2xl" {...props} />,
    h3: (props: any) => <h3 className="text-[var(--text-main)] font-semibold text-xl" {...props} />,
    
    p: (props: any) => <p className="text-[var(--text-main)] leading-relaxed text-[17px]" {...props} />,
    
    ul: (props: any) => <ul className="text-[var(--text-main)] text-md" {...props} />,
    ol: (props: any) => <ol className="text-[var(--text-main)] text-md" {...props} />,

    hr: (props: any) => <hr className="text-gray-600 mx-[-15px]" />,

    li: (props: any) => <li className="[&>p]:inline" {...props} />,

    blockquote: (props: any) => (
      <blockquote className="mb-8 bg-[var(--brand-main)]/20 p-5 rounded-xl border-l-4 border-[var(--brand-main)]">
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
    
    // 🔴 आता ते lowercase केलेले कंपोनंट्स इथे वापरले जातील
    ...lowerCaseVisualComponents,
  };

  return (
    <div className="markdown-body">
      <ReactMarkdown rehypePlugins={[rehypeRaw]} components={customComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}