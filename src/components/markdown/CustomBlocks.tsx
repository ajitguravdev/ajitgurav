// src/components/markdown/CustomBlocks.tsx
import React from "react";
import { Lightbulb, Info, AlertTriangle, XCircle, CheckCircle2 } from "lucide-react";

// १. Intro Box (प्रस्तावना - मोठ्या अक्षरांसाठी)
export const IntroBox = ({ children }: any) => (
  <div className="text-xl text-[var(--brand-muted)] font-medium leading-relaxed my-8 flex flex-col gap-4">
    {children}
  </div>
);

// २. Alert Box (Unified Box - एकसमान डिझाईन, फक्त रंग बदलणार)
export const AlertBox = ({ type = "note", children }: any) => {
  let config = {
    icon: Info,
    iconColor: "text-sky-500 dark:text-sky-400",
    bgColor: "bg-sky-50 dark:bg-sky-400/10",
    borderColor: "border-sky-200 dark:border-sky-400/20",
  };

  switch (type?.toLowerCase()) {
    case "warning":
      config = {
        icon: AlertTriangle,
        iconColor: "text-amber-500 dark:text-amber-400",
        bgColor: "bg-amber-50 dark:bg-amber-400/10",
        borderColor: "border-amber-200 dark:border-amber-400/20",
      };
      break;
    case "danger":
    case "alert":
      config = {
        icon: XCircle,
        iconColor: "text-rose-500 dark:text-rose-400",
        bgColor: "bg-rose-50 dark:bg-rose-400/10",
        borderColor: "border-rose-200 dark:border-rose-400/20",
      };
      break;
    case "tip":
    case "success":
      config = {
        icon: CheckCircle2,
        iconColor: "text-emerald-500 dark:text-emerald-400",
        bgColor: "bg-emerald-50 dark:bg-emerald-400/10",
        borderColor: "border-emerald-200 dark:border-emerald-400/20",
      };
      break;
    case "default":
      config = {
        icon: CheckCircle2,
        iconColor: "text-emerald-500 dark:text-emerald-400",
        bgColor: "bg-[var(--bg-surface)]",
        borderColor: "border-[var(--border-strong)]",
      };
      break;
  }

  // const IconCmp = config.icon;

  return (
    <div
      className={`my-[var(--space-lg)] flex gap-4 rounded-xl border p-5 transition-colors ${config.bgColor} ${config.borderColor}`}>
      {/* 🔴 मजकूर: इथे आपण आपला रेग्युलर text-main वापरला आहे, रंगीत नाही! */}
      <div className="w-full text-[15px] leading-relaxed text-[var(--text-main)] opacity-90 flex flex-col gap-3">
        {children}
      </div>
    </div>
  );
};

// ३. Takeaway Box (खास ब्रँड कलरची पातळ बॉर्डर आणि आयकॉन)
export const TakeawayBox = ({ children }: any) => (
  <div className="mt-12 mb-8 bg-gradient-to-r from-[var(--brand-main)]/20 to-blue-50  dark:to-blue-900/20 p-1 rounded-2xl shadow-lg relative overflow-hidden">
    <div className="bg-[var(--bg-elevated)] p-6 sm:p-8 rounded-xl h-full">
      {/* <div className="absolute top-0 left-0 w-full h-1 bg-[var(--brand-main)] opacity-80"></div>
      <h3 className="text-xl font-bold text-[var(--brand-main)] flex items-center gap-2 mb-4 mt-0">
        <Lightbulb className="w-6 h-6" /> 💡 Technical Key Takeaway
      </h3> */}
      <div className="text-[var(--text-muted)] font-medium leading-relaxed flex flex-col gap-3">
        {children}
      </div>
    </div>
  </div>
);

// ४. List to Cards Wrapper
export const ListCards = ({ children, cols = "2" }: any) => {
  const gridClass = cols === "3" ? "lg:grid-cols-3 md:grid-cols-2" : "md:grid-cols-2";
  return <div className={`my-8 list-cards-wrapper text-[16px] ${gridClass}`}>{children}</div>;
};
