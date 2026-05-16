import type { Metadata } from "next";
import { Mukta, Fira_Code } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { SidebarProvider } from "@/context/SidebarContext";
import { navigationConfig } from "@/config/navigation";
import Footer from "@/components/layout/Footer"; // Footer इम्पोर्ट करा

const mukta = Mukta({ subsets: ["latin", "devanagari"], weight: ["300", "400", "500", "600", "700"], variable: "--font-mukta" });
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira-code" });

export const metadata: Metadata = { title: "AJDevIt", description: "Learn Coding in Marathi" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
const subjects = navigationConfig.subjects.map(s => ({ name: s.title, slug: s.slug }));
  return (
    <html lang="mr" data-theme="teal" className={`${mukta.variable} ${firaCode.variable}`}>
      <body className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-300 antialiased flex flex-col min-h-screen">
        <SidebarProvider>
          {/* Header सर्व पानांवर दिसेल */}
          <Header subjects={subjects} />
          {/* मुख्य कंटेंट */}
        <div className="flex-1 flex flex-col">
          {children}
        </div>

        {/* सर्व पानांवर सर्वात खाली Footer दिसेल */}
        <Footer />
        </SidebarProvider>
      </body>
    </html>
  );
}