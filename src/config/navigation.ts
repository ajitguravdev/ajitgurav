// src/config/navigation.ts

import { Tier } from './subscription';

export type NavigationConfig = {
  subjects: {
    slug: string;
    title: string;
    order?: number;
    groups: {
      subtitle: string;
      lessons: {
        slug: string;
        title: string;
        accessTier?: Tier;
        children?: {
          slug: string;
          title: string;
          accessTier?: Tier;
        }[];
      }[];
    }[];
  }[];
};

export type SubjectConfig = NavigationConfig['subjects'][number];

// --- Subjects ---
const react: SubjectConfig = {
  slug: "react",
  title: "React",
  order: 1,
  groups: [
    {
      subtitle: "React Basics",
      lessons: [
        { slug: "intro", title: "Introduction" },
        { slug: "jsx", title: "JSX in React" },
        { slug: "event", title: "React Event" },
        { slug: "useeffect", title: "React useEffect" },
      ],
    },
    {
      subtitle: "Starter Lessons",
      lessons: [
        { slug: "components", title: "React Components", accessTier: "starter" },
        { slug: "props", title: "Props in React", accessTier: "starter" },
      ],
    },
    {
      subtitle: "Pro Lessons (Hooks)",
      lessons: [
        { slug: "useState", title: "useState Hook", accessTier: "pro" },
        { slug: "useEffect", title: "useEffect Hook", accessTier: "pro" },
      ],
    },
    {
      subtitle: "Master Concepts",
      lessons: [
        { slug: "context", title: "React Context API", accessTier: "master" },
        { slug: "performance", title: "Performance Optimization", accessTier: "master" },
      ],
    },
  ],
};

const javascript: SubjectConfig = {
  slug: "javascript",
  title: "JavaScript",
  order: 2,
  groups: [
    {
      subtitle: "JS Basics",
      lessons: [
        { slug: "intro", title: "Introduction" },
        { slug: "variables", title: "JS Variables" },
      ],
    },
    {
      subtitle: "Starter Lessons",
      lessons: [
        { slug: "functions", title: "JS Functions", accessTier: "starter" },
        { slug: "arrays", title: "JS Arrays", accessTier: "starter" },
      ],
    },
  ],
};

const computerMemory: SubjectConfig = {
  slug: "memory-architecture",
  title: "Memory Architecture",
  order: 3,
  groups: [
    {
      subtitle: "Memory Basics",
      lessons: [
        { slug: "intro", title: "Introduction" },
        { slug: "basics-of-computer-memory", title: "Basics of Computer Memory" },
        // { slug: "binary-system-counting", title: "Binary System & Counting" },
        // { slug: "practical-examples-usage", title: "Practical Examples & Usage" },
        // { slug: "the-3-Bit-logic", title: "The 3-Bit Logic & Hardware Decoders" },
        // { slug: "text-ascii-decoding", title: "Text & ASCII Decoding" },
      ],
    },
  ],
};

export const navigationConfig: NavigationConfig = {
  // order नुसार सॉर्ट करून एक्सपोर्ट करणे
  subjects: [computerMemory].sort((a, b) => (a.order || 99) - (b.order || 99)),
  // subjects: [react, javascript, computerMemory].sort((a, b) => (a.order || 99) - (b.order || 99)),
};