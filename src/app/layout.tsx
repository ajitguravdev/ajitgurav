// src\app\layout.tsx

import type { Metadata } from "next";
import { Mukta, Fira_Code } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { SidebarProvider } from "@/context/SidebarContext";
import { navigationConfig } from "@/config/navigation";
import Footer from "@/components/layout/Footer"; // Footer इम्पोर्ट करा
import ThemeProvider from "@/theme/theme-provider";

const mukta = Mukta({
  subsets: ["latin", "devanagari"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mukta",
});
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira-code" });

export const metadata: Metadata = { title: "AjitGurav", description: "Learn Coding in Marathi" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const subjects = navigationConfig.subjects.map((s) => ({ name: s.title, slug: s.slug }));

  return (
    <html
      lang="mr"
      data-theme="teal"
      className={`${mukta.variable} ${firaCode.variable}`}
      suppressHydrationWarning>
      {/* <body className="bg-[var(--theme-bg-main)] text-[var(--theme-text-main)] antialiased flex flex-col min-h-screen"> */}
        <body className="bg-[var(--bg-base)] text-[var(--text-main)] antialiased min-h-screen flex flex-col selection:bg-[var(--brand-light)] selection:text-[var(--brand-main)] transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <SidebarProvider>
            {/* Header सर्व पानांवर दिसेल */}
            <Header subjects={subjects} />
            {/* मुख्य कंटेंट */}
            <div className="flex-1 flex flex-col">{children}</div>

            {/* सर्व पानांवर सर्वात खाली Footer दिसेल */}
            <Footer />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
