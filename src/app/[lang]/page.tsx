import Link from "next/link";
import { Terminal, BookOpen, Code, Database, Server, Cpu } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/lib/dictionary";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  const dict = await getDictionary(lang as "en" | "mr" | "hi");

  // १. सर्व विषयांची (Subjects) डायनॅमिक यादी (Array)
  const subjectCards = [
    {
      id: "memory",
      title: dict.home.subject1_title, // उदा. "Computer Memory"
      desc: dict.home.subject1_desc,
      href: `/${lang}/memory-architecture/intro`,
      icon: BookOpen,
      color: "brand", // यासाठी आपण खाली CSS Classes मॅप केले आहेत
      isReady: true,
    },
    // {
    //   id: "javascript",
    //   title: dict.home.subject_js_title || "JavaScript Internals", 
    //   desc: dict.home.subject_js_desc || "V8 Engine, Event Loop & Promises",
    //   href: `/${lang}/javascript/intro`,
    //   icon: Code,
    //   color: "blue",
    //   isReady: false,
    // },
    // {
    //   id: "datastructures",
    //   title: dict.home.subject_ds_title || "Data Structures",
    //   desc: dict.home.subject_ds_desc || "Arrays, Linked Lists, Trees & Algorithms",
    //   href: `/${lang}/data-structures/intro`,
    //   icon: Database,
    //   color: "violet",
    //   isReady: false,
    // },
    // भविष्यात PHP किंवा C++ ॲड करायचे असेल तर फक्त इथे एक नवीन ब्लॉक टाकायचा!
  ];

  // रंगांनुसार CSS चे क्लास ठरवणारे फंक्शन
  const getColorClasses = (color: string) => {
    switch (color) {
      case "brand": return "bg-brand-100 dark:bg-brand-900/50 text-brand-600 dark:text-brand-400";
      case "blue": return "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 border-transparent hover:border-blue-300 dark:hover:border-blue-700";
      case "violet": return "bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400 border-transparent hover:border-violet-300 dark:hover:border-violet-700";
      default: return "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400";
    }
  };

  return (
    <main className="flex-1 w-full px-4 sm:px-8 py-12 lg:py-24 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 font-medium text-sm mb-6 border border-brand-100 dark:border-brand-800">
          <Terminal className="w-4 h-4" />
          {lang === "en"
            ? `${dict.home.welcome} ${siteConfig.name}`
            : `${siteConfig.name} ${dict.home.welcome}`}
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
          {dict.home.title_part1}{" "}
          <span className="text-brand-500">{dict.home.title_highlight1}</span>
          {dict.home.title_part2}{" "}
          <span className="text-blue-500">{dict.home.title_highlight2}</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">
          {dict.home.description}
        </p>

        <Link
          href={`/${lang}/memory-architecture/intro`}
          className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-brand-600 border border-transparent rounded-xl hover:bg-brand-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-600">
          {dict.home.cta}
        </Link>
      </div>

      {/* Feature / Subjects Grid (आता पूर्णपणे Dynamic) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {subjectCards.map((subject) => {
          const Icon = subject.icon;
          const CardContent = (
            <div className={`bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm transition-all h-full ${
              subject.isReady 
                ? "hover:shadow-md hover:border-brand-300 dark:hover:border-brand-700" 
                : "opacity-75"
            }`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform ${
                subject.isReady ? "group-hover:scale-110" : ""
              } ${getColorClasses(subject.color)}`}>
                <Icon className="w-6 h-6" />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex justify-between items-center">
                {subject.title}
                {!subject.isReady && (
                  <span className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-slate-500 font-medium">
                    {dict.home.coming_soon}
                  </span>
                )}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {subject.desc}
              </p>
            </div>
          );

          // जर कोर्स तयार असेल तर Link द्या, नसेल तर फक्त एक सामान्य <div> दाखवा
          return subject.isReady ? (
            <Link key={subject.id} href={subject.href} className="group cursor-pointer">
              {CardContent}
            </Link>
          ) : (
            <div key={subject.id} className="cursor-not-allowed">
              {CardContent}
            </div>
          );
        })}

      </div>
    </main>
  );
}