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
  
  // TypeScript चा एरर घालवण्यासाठी आपण सर्व components एका 'any' प्रकारच्या डब्यात ठेवत आहोत.
  const customComponents: any = {
    // मूळ HTML टॅग्स
    h2: ({ node, ...props }: any) => <h2 className="scroll-mt-24 text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-4 border-b border-slate-100 dark:border-slate-700" {...props} />,
    h3: ({ node, ...props }: any) => <h3 className="scroll-mt-24 text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-4" {...props} />,
    p: ({ node, ...props }: any) => <p className="mb-6 text-lg" {...props} />,
    pre: ({ children }: any) => <>{children}</>,
    ul: ({ node, ...props }: any) => <ul className="list-disc pl-6 mb-6 space-y-2 marker:text-brand-500 text-slate-700 dark:text-slate-300 text-lg" {...props} />,
    ol: ({ node, ...props }: any) => <ol className="list-decimal pl-6 mb-6 space-y-2 marker:text-brand-500 text-slate-700 dark:text-slate-300 text-lg" {...props} />,
    li: ({ node, ...props }: any) => <li className="[&>p]:mb-0 [&>p]:inline" {...props} />,
    blockquote: ({ node, ...props }: any) => <blockquote className="mb-8 bg-brand-50 dark:bg-brand-900/20 p-5 rounded-xl border-l-4 border-brand-500 italic" {...props} />,
    
    // आपले वेगळे केलेले स्मार्ट कस्टम ब्लॉक्स new2
    "lesson-section": LessonSection,
    "info-box": InfoBox,
    "takeaway-box": TakeawayBox,
    "grid-container": GridContainer,
    "grid-card": GridCard,
    "alert-box": AlertBox,
    "magic-box": ({ children }: any) => <MagicBox>{children}</MagicBox>,

    // किचकट कोड आणि डायग्राम लॉजिक
    code: CodeRenderer,
  };

  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      components={customComponents}
    >
      {content}
    </ReactMarkdown>
  );
}