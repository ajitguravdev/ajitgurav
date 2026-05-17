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
    <h4 className="font-semibold mb-3 flex items-center gap-2 text-base mt-0">
      <Info className="w-5 h-5 text-brand-500" /> {title || "या आकृतीत काय दाखवले आहे?"}
    </h4>
    <div className="info-content text-slate-700 dark:text-slate-300 text-sm md:text-base marker:text-brand-400 pl-2">
      {children}
    </div>
  </div>
);

// ३. Takeaway Box
export const TakeawayBox = ({ children }: any) => (
  <div className="mt-12 bg-gradient-to-r from-brand-50 to-blue-50 dark:from-brand-900/20 dark:to-blue-900/20 p-1 rounded-2xl shadow-lg mb-4">
    <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl h-full">
      <h3 className="text-xl font-bold text-brand-600 dark:text-brand-400 flex items-center gap-2 mb-4 mt-0">
        <Lightbulb className="w-6 h-6" /> 💡 Technical Key Takeaway
      </h3>
      <div className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
        {children}
      </div>
    </div>
  </div>
);

// ४. Grid Container
export const GridContainer = ({ cols, children }: any) => {
  const colClass = cols === "3" ? "lg:grid-cols-3 sm:grid-cols-2" : "sm:grid-cols-2";
  return (
    <div className={`grid grid-cols-1 ${colClass} gap-4 md:gap-5 mb-8`}>
      {children}
    </div>
  );
};

// ५. Grid Card
export const GridCard = ({ title, number, active, children }: any) => {
  const isActive = active === "true" || active === true;
  return (
    <div className={`p-4 sm:p-5 rounded-xl border flex items-start gap-3 sm:gap-4 transition-all duration-300 ${
      isActive 
        ? "bg-brand-50 dark:bg-brand-900/20 border-brand-300 dark:border-brand-700 shadow-md transform hover:-translate-y-1" 
        : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-700/50 hover:shadow-sm"
    }`}>
      {number && (
        <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-extrabold text-sm border ${
          isActive 
            ? "bg-brand-500 text-white border-brand-600 shadow-sm" 
            : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
        }`}>
          {number}
        </div>
      )}
      <div className="w-full">
        {title && (
          <strong className={`block mb-1.5 ${isActive ? "text-brand-800 dark:text-brand-300" : "text-slate-800 dark:text-slate-200"}`}>
            {title}
          </strong>
        )}
        <div className={`text-sm md:text-base [&>p]:m-0 [&>p]:inline ${isActive ? "text-brand-700 dark:text-brand-400" : "text-slate-600 dark:text-slate-400"}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

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
      iconBoxClass = "bg-amber-100 dark:bg-amber-800";
      iconColorClass = "text-amber-600 dark:text-amber-400";
      titleClass = "text-amber-900 dark:text-amber-300";
      contentClass = "text-amber-800 dark:text-amber-200/90";
      IconCmp = AlertTriangle;
      defaultTitle = "लक्षात ठेवा (Warning)";
      break;
    case "alert":
    case "danger":
      wrapperClass = "bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-700/50";
      iconBoxClass = "bg-rose-100 dark:bg-rose-800";
      iconColorClass = "text-rose-600 dark:text-rose-400";
      titleClass = "text-rose-900 dark:text-rose-300";
      contentClass = "text-rose-800 dark:text-rose-200/90";
      IconCmp = AlertCircle;
      defaultTitle = "महत्त्वाची सूचना (Alert)";
      break;
    case "tip":
    case "success":
      wrapperClass = "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700/50";
      iconBoxClass = "bg-emerald-100 dark:bg-emerald-800";
      iconColorClass = "text-emerald-600 dark:text-emerald-400";
      titleClass = "text-emerald-900 dark:text-emerald-300";
      contentClass = "text-emerald-800 dark:text-emerald-200/90";
      IconCmp = Lightbulb;
      defaultTitle = "खास टीप (Pro Tip)";
      break;
    case "note":
    default:
      wrapperClass = "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700/50";
      iconBoxClass = "bg-blue-100 dark:bg-blue-800";
      iconColorClass = "text-blue-600 dark:text-blue-400";
      titleClass = "text-blue-900 dark:text-blue-300";
      contentClass = "text-blue-800 dark:text-blue-200/90";
      IconCmp = Info;
      defaultTitle = "नोंद (Note)";
      break;
  }

  return (
    <div className={`p-5 rounded-xl border shadow-sm flex gap-4 my-8 transition-colors ${wrapperClass}`}>
      <div className={`p-2 rounded-lg h-fit shrink-0 ${iconBoxClass}`}>
        <IconCmp className={`w-6 h-6 ${iconColorClass}`} />
      </div>
      <div className="w-full">
        <strong className={`text-lg block mb-1 font-bold ${titleClass}`}>
          {title || defaultTitle}
        </strong>
        <div className={`leading-relaxed [&>p]:m-0 [&>p]:inline ${contentClass}`}>
          {children}
        </div>
      </div>
    </div>
  );
};