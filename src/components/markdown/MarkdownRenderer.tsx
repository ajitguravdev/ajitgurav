import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import MagicBox from "./MagicBox";

// आपण बनवलेल्या नवीन फाईल्समधून कंपोनंट्स इम्पोर्ट करा
import { CodeRenderer } from "./CodeRenderer";
import { 
  LessonSection, 
  InfoBox, 
  TakeawayBox, 
  GridContainer, 
  GridCard, 
  AlertBox 
} from "./CustomBlocks";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      components={{
        // मूळ HTML टॅग्स
        h2: ({ node, ...props }) => <h2 className="scroll-mt-24 text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-4 border-b border-slate-100 dark:border-slate-700" {...props} />,
        h3: ({ node, ...props }) => <h3 className="scroll-mt-24 text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-4" {...props} />,
        p: ({ node, ...props }) => <p className="mb-6 text-lg" {...props} />,
        pre: ({ children }) => <>{children}</>,
        ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-6 space-y-2 marker:text-brand-500 text-slate-700 dark:text-slate-300 text-lg" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-6 space-y-2 marker:text-brand-500 text-slate-700 dark:text-slate-300 text-lg" {...props} />,
        li: ({ node, ...props }) => <li className="[&>p]:mb-0 [&>p]:inline" {...props} />,
        blockquote: ({ node, ...props }) => <blockquote className="mb-8 bg-brand-50 dark:bg-brand-900/20 p-5 rounded-xl border-l-4 border-brand-500 italic" {...props} />,
        
        // आपले वेगळे केलेले स्मार्ट कस्टम ब्लॉक्स
        "lesson-section": LessonSection as any,
        "info-box": InfoBox as any,
        "takeaway-box": TakeawayBox as any,
        "grid-container": GridContainer as any,
        "grid-card": GridCard as any,
        "alert-box": AlertBox as any,
        "magic-box": ({ children }: any) => <MagicBox>{children}</MagicBox>,

        // किचकट कोड आणि डायग्राम लॉजिक
        code: CodeRenderer as any,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}