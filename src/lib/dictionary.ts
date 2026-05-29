// src/lib/dictionary.ts

// आपण बनवलेल्या JSON फाईल्स इथे इम्पोर्ट होतील
const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  mr: () => import('@/dictionaries/mr.json').then((module) => module.default),
  hi: () => import('@/dictionaries/hi.json').then((module) => module.default),
};

export const getDictionary = async (locale: 'en' | 'mr' | 'hi') => {
  // जर चुकीची भाषा आली तर default 'mr' वाचेल
  return dictionaries[locale]?.() ?? dictionaries.mr();
};