// src\components\markdown\CustomBlocks.tsx

import React from "react";
import { Table2, Cable, Scaling, Info, Lightbulb, Calculator, AlertTriangle, AlertCircle } from "lucide-react";

// १. Lesson Section
export const LessonSection = ({ title, icon, children }: any) => {
  const IconCmp = 
    icon === "calculator" ? Calculator :
    icon === "table" ? Table2 :
    icon === "cable" ? Cable :
    icon === "scaling" ? Scaling : Info;

  return (
    <section className="mt-12 bg-white dark:bg-slate-800/60 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-700/60 hover:border-brand-500/50 transition-colors">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-6 border-b border-slate-100 dark:border-slate-700 pb-4 mt-0">
        {/* <span className="bg-brand-100 dark:bg-brand-900/40 p-2 rounded-lg">
          <IconCmp className="w-6 h-6 text-brand-600 dark:text-brand-400" />
        </span> */}
        {title}
      </h2>
      <div className="relative z-10 text-slate-700 dark:text-slate-300">
        {children}
      </div>
    </section>
  );
};

// २. Info Box
export const InfoBox = ({ title, children }: any) => (
  <div className="bg-brand-50 dark:bg-brand-900/10 p-5 rounded-xl border border-brand-100 dark:border-brand-900/30 mb-8 mt-4 shadow-sm">
    {/* <h4 className="font-semibold mb-3 flex items-center gap-2 text-base mt-0">
      <Info className="w-5 h-5 text-brand-500" /> {title || "या आकृतीत काय दाखवले आहे?"}
    </h4> */}
    <div className="info-content text-slate-700 dark:text-slate-300 text-sm md:text-base marker:text-brand-400 pl-2">
      {children}
    </div>
  </div>
);

// ३. Takeaway Box
export const TakeawayBox = ({ children }: any) => (
  <div className="mt-12 bg-gradient-to-r from-brand-50 to-blue-50 dark:from-brand-900/20 dark:to-blue-900/20 p-1 rounded-2xl shadow-lg mb-4">
    <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl h-full">
      {/* <h3 className="text-xl font-bold text-brand-600 dark:text-brand-400 flex items-center gap-2 mb-4 mt-0">
        <Lightbulb className="w-6 h-6" /> 💡 Technical Key Takeaway
      </h3> */}
      {/* 🔴 FIX: इथेही flex flex-col gap-3 लावले आहे */}
      <div className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed flex flex-col gap-3">
        {children}
      </div>
    </div>
  </div>
);
// ६. Alert Box
export const AlertBox = ({ type = "note", title, children }: any) => {
  let wrapperClass = "";
  let iconBoxClass = "";
  let iconColorClass = "";
  let titleClass = "";
  let contentClass = "";
  let IconCmp = Info;
  let defaultTitle = "";

  switch (type?.toLowerCase()) {
    case "warning":
      wrapperClass = "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700/50";
      contentClass = "text-amber-800 dark:text-amber-200/90";
      break;
    case "alert":
    case "danger":
      wrapperClass = "bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-700/50";
      contentClass = "text-rose-800 dark:text-rose-200/90";
      break;
    case "tip":
    case "success":
      wrapperClass = "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700/50";
      contentClass = "text-emerald-800 dark:text-emerald-200/90";
      break;
    case "note":
    default:
      wrapperClass = "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700/50";
      contentClass = "text-blue-800 dark:text-blue-200/90";
      break;
  }

  return (
    <div className={`p-5 rounded-xl border shadow-sm flex gap-4 my-8 transition-colors ${wrapperClass}`}>
      <div className="w-full text-sm">
        {/* 🔴 FIX: जुने [&>p]:inline काढून इथे flex, flex-col आणि gap-3 लावले आहे */}
        <div className={`leading-relaxed flex flex-col gap-3 ${contentClass}`}>
          {children}
        </div>
      </div>
    </div>
  );
};


// ७. List to Cards Wrapper
export const ListCards = ({ children, cols = "2" }: any) => {
  // युजरला २ किंवा ३ कॉलम्सची ग्रिड हवी असल्यास
  const gridClass = cols === "2" ? "lg:grid-cols-3 md:grid-cols-2" : "md:grid-cols-2";
  
  return (
    <div className={`my-8 list-cards-wrapper ${gridClass}`}>
      {children}
    </div>
  );
};
/*📝 नियमपुस्तिका: <list-cards> कसे वापरावे?
जेव्हा तू AI ला (उदा. मला) एखादा धडा लिहायला सांगशील, तेव्हा त्याला हा 'प्रॉम्प्ट' किंवा नियम द्यायचा:

AI ला देण्यासाठी सूचना (Prompt Rule):
"जेव्हा तुला २, ३ किंवा ४ मुद्द्यांची (Points) तुलना करायची असेल किंवा वैशिष्ट्ये सांगायची असतील, तेव्हा साधी लिस्ट वापरू नकोस. त्याऐवजी <list-cards> टॅग वापर.
नियम:
१. सुरुवात <list-cards cols="2"> किंवा <list-cards cols="3"> ने कर.
२. प्रत्येक मुद्दा डॅश (-) ने सुरु झाला पाहिजे.
३. मुद्द्याचे शीर्षक (Title) नेहमी ठळक **शीर्षक:** (Bold) मध्ये असले पाहिजे.
४. शीर्षकानंतर १ स्पेस सोडून स्पष्टीकरण लिही.
५. शेवटी </list-cards> ने टॅग बंद कर." */