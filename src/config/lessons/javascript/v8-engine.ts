// src/config/lessons/javascript/v8-engine.ts
import { StyleZone } from "@/components/markdown/UnicodeDiagram";

// 'lessonZones' याच नावाने एक्सपोर्ट करायचे, जेणेकरून सिस्टमला ते वाचायला सोपे जाईल.
export const lessonZones: Record<string, StyleZone[]> = {
  "call-stack": [
    { rowStart: 0, colStart: 4, rowEnd: 0, colEnd: 13, className: 'text-[var(--brand-main)] font-bold' },
    { rowStart: 1, colStart: 2, rowEnd: 1, colEnd: 15, className: 'text-[var(--color-success)] font-bold bg-[var(--color-success)]/10 animate-pulse' },
    { rowStart: 1, colStart: 20, rowEnd: 1, colEnd: 29, className: 'text-[var(--color-warning)] font-bold animate-pulse' }
  ],
  "memory-pointers": [
    { rowStart: 0, colStart: 0, rowEnd: 0, colEnd: 11, className: 'text-[var(--brand-main)] font-bold' },
    { rowStart: 0, colStart: 22, rowEnd: 0, colEnd: 32, className: 'text-[var(--color-info)] font-bold' },
    { rowStart: 3, colStart: 23, rowEnd: 3, colEnd: 36, className: 'text-[var(--color-success)] font-semibold bg-[var(--color-success)]/10 px-1' }
  ]
};