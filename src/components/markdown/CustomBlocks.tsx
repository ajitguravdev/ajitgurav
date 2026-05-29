import React from "react";
import { Lightbulb } from "lucide-react";

// १. Intro Box (प्रस्तावना - मोठ्या अक्षरांसाठी)
export const IntroBox = ({ children }: any) => (
  // <div className="text-lg text-[var(--brand-muted)] font-medium leading-relaxed my-8 flex flex-col gap-4">
  <div className="text-xl text-[var(--brand-muted)] font-medium leading-relaxed my-8 flex flex-col gap-4">
    {children}
  </div>
);

// २. Alert Box (Unified Box - एकसमान डिझाईन, फक्त रंग बदलणार)
export const AlertBox = ({ type = "note", children }: any) => {
  let wrapperClass = "";

  switch (type?.toLowerCase()) {
    case "warning":
      wrapperClass = "bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200";
      break;
    case "alert":
    case "danger":
      wrapperClass = "bg-rose-50 dark:bg-rose-900/10 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200";
      break;
    case "tip":
    case "success":
      wrapperClass = "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200";
      break;
    case "note":
    default:
      wrapperClass = "bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200";
      break;
  }

  return (
    // इथे आपण solid 1px border आणि rounded-xl वापरून unified design दिली आहे
    <div className={`p-5 sm:p-6 rounded-xl border shadow-sm my-8 transition-colors flex flex-col gap-3 leading-relaxed text-[16px] sm:text-base ${wrapperClass}`}>
      {children}
    </div>
  );
};

// ३. Takeaway Box (खास ब्रँड कलरची पातळ बॉर्डर आणि आयकॉन)
export const TakeawayBox = ({ children }: any) => (
  <div className="mt-12 mb-8 bg-white dark:bg-[#0d1117] p-6 sm:p-8 rounded-2xl border border-[var(--brand-main)] shadow-lg relative overflow-hidden">
    {/* हलकासा ग्लो इफेक्ट (Optional) */}
    <div className="absolute top-0 left-0 w-full h-1 bg-[var(--brand-main)] opacity-80"></div>
    
    <h3 className="text-xl font-bold text-[var(--brand-main)] flex items-center gap-2 mb-4 mt-0">
      <Lightbulb className="w-6 h-6" /> 💡 Technical Key Takeaway
    </h3>
    <div className="text-[var(--text-main)] font-medium leading-relaxed flex flex-col gap-3">
      {children}
    </div>
  </div>
);

// ४. List to Cards Wrapper (तुझा जुनाच कोड)
export const ListCards = ({ children, cols = "2" }: any) => {
  const gridClass = cols === "2" ? "lg:grid-cols-3 md:grid-cols-2" : "md:grid-cols-2";
  return (
    <div className={`my-8 list-cards-wrapper text-[16px] ${gridClass}`}>
      {children}
    </div>
  );
};