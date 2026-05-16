// src/lib/content.ts

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'src/content');

// इथे आपण 'lang' पॅरामीटर ऍड केला आहे!
export function getLessonContent(lang: string, subjectSlug: string, lessonSlug: string) {
  try {
    // आता पाथ असा बनेल: src/content/mr/react/jsx.mdx
    const fullPath = path.join(contentDirectory, lang, subjectSlug, `${lessonSlug}.mdx`);
    
    // फाईल नसेल तर null रिटर्न करा
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      frontmatter: data,
      content,
    };
  } catch (error) {
    console.error("Error reading markdown:", error);
    return null;
  }
}