// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// आपल्या वेबसाईटच्या ३ भाषा
const locales = ["mr", "hi", "en"];
const defaultLocale = "mr"; 

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Static फाईल्स, Images आणि Next.js च्या सिस्टीम फाईल्स सोडून द्या
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") 
  ) {
    return NextResponse.next();
  }

  // 2. युजरच्या URL मध्ये आधीपासूनच भाषा (mr, hi, en) आहे का ते तपासा
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next(); // भाषा असेल तर सरळ जाऊ द्या
  }

  // -----------------------------------------------------------
  // ३. SMART LOGIC: युजरच्या Cookies मधून त्याची आवडती भाषा काढा
  // -----------------------------------------------------------
  let userPreferredLocale = defaultLocale; // सुरुवातीला मराठी मानून चला

  // कुकी वाचण्याचा प्रयत्न करा (जे आपण Header मध्ये सेव्ह केली आहे)
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;

  // जर कुकी असेल आणि ती आपल्या ३ भाषांपैकी एक असेल, तर ती भाषा निवडा
  if (cookieLocale && locales.includes(cookieLocale)) {
    userPreferredLocale = cookieLocale;
  }

  // 4. ठरलेल्या भाषेनुसार (Cookie किंवा Default) Redirect करा
  // उदा: /react -> /en/react (जर कुकी 'en' असेल)
  request.nextUrl.pathname = `/${userPreferredLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};