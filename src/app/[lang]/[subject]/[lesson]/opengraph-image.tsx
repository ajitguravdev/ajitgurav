// src/app/[lang]/[subject]/[lesson]/opengraph-image.tsx
import { ImageResponse } from 'next/og';
import { getLessonContent } from "@/lib/content";

// 🔴 आपण 'edge' काढून टाकले आहे जेणेकरून Next.js फाईल्स वाचू शकेल.
// (बाय-डिफॉल्ट Next.js आता Node.js रनटाइम वापरेल)

export const alt = 'AJDevIT Lesson Cover';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ lang: string; subject: string; lesson: string }> }) {
  // 🔴 Next.js 16 (Turbopack) च्या नवीन नियमानुसार params हे Promise असते, त्यामुळे त्याला await करणे गरजेचे आहे.
  const resolvedParams = await params;
  const { lang, subject, lesson } = resolvedParams;
  
  // धड्याचा डेटा मिळवणे (टायटलसाठी)
  const lessonData = getLessonContent(lang, subject, lesson);
  const title = lessonData?.frontmatter?.title || lesson.replace(/-/g, ' ').toUpperCase();
  const subjectName = subject.replace(/-/g, ' ').toUpperCase();

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #030712, #10141e)', 
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          borderTop: '16px solid #0ea5e9', 
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '20px' }}>
          <h2 style={{ color: '#94a3b8', fontSize: 36, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
            {subjectName} TUTORIAL
          </h2>
          <h1 style={{ color: '#ffffff', fontSize: 72, fontWeight: 900, lineHeight: 1.2, margin: 0, padding: '0 40px' }}>
            {title}
          </h1>
        </div>

        <div style={{ display: 'flex', position: 'absolute', bottom: 50, alignItems: 'center' }}>
          <div style={{ fontSize: 40, color: '#0ea5e9', fontWeight: 'bold', letterSpacing: '0.05em' }}>
            AJDevIT
          </div>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#0ea5e9', margin: '0 24px' }} />
          <div style={{ fontSize: 32, color: '#94a3b8' }}>
            Learn Coding in Marathi
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}