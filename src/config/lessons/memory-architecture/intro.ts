// src/config/lessons/javascript/v8-engine.ts
import { StyleZone } from "@/components/markdown/UnicodeDiagram";

// 'lessonZones' याच नावाने एक्सपोर्ट करायचे, जेणेकरून सिस्टमला ते वाचायला सोपे जाईल.
export const lessonZones: Record<string, StyleZone[]> = {
  
  // १. Call Stack डायग्रामचे नियम
  "call-stack": [
    { rowStart: 0, colStart: 4, rowEnd: 0, colEnd: 13, className: 'text-[var(--brand-main)] font-bold' },
    { rowStart: 1, colStart: 2, rowEnd: 1, colEnd: 15, className: 'text-[var(--color-success)] font-bold bg-[var(--color-success)]/10 animate-pulse' },
    { rowStart: 1, colStart: 20, rowEnd: 1, colEnd: 29, className: 'text-[var(--color-warning)] font-bold animate-pulse' }
  ],

  // २. Memory Pointers डायग्रामचे नियम
  "memory-pointers": [
    { rowStart: 0, colStart: 0, rowEnd: 0, colEnd: 11, className: 'text-[var(--brand-main)]' },
    { rowStart: 0, colStart: 22, rowEnd: 0, colEnd: 32, className: 'text-[var(--color-info)]' },
    { rowStart: 2, colStart: 2, rowEnd: 2, colEnd: 9, className: 'text-[var(--text-main)]' },
    { rowStart: 3, colStart: 2, rowEnd: 3, colEnd: 7, className: 'text-[var(--color-warning)]' },
    { rowStart: 3, colStart: 9, rowEnd: 3, colEnd: 21, className: 'text-[var(--color-info)] animate-pulse' },
    { rowStart: 3, colStart: 23, rowEnd: 3, colEnd: 37, className: 'text-[var(--color-success)]' }
  ],

  // ३. V8 Engine Pipeline डायग्रामचे नियम
  "v8-pipeline": [
    { rowStart: 0, colStart: 35, rowEnd: 0, colEnd: 45, className: 'text-[var(--color-warning)] font-bold' },
    { rowStart: 0, colStart: 51, rowEnd: 0, colEnd: 62, className: 'text-[var(--color-warning)] bg-[var(--color-warning)]/10' },
    { rowStart: 1, colStart: 41, rowEnd: 2, colEnd: 42, className: 'text-[var(--color-danger)] font-black animate-pulse' },
    { rowStart: 3, colStart: 34, rowEnd: 3, colEnd: 45, className: 'text-[var(--color-danger)] font-bold' },
    { rowStart: 3, colStart: 52, rowEnd: 3, colEnd: 63, className: 'text-white bg-red-500 font-bold px-1 rounded-sm' }
  ],

  // ४. Single Switch Diagram
  "single-switch": [
    { rowStart: 0, colStart: 1, rowEnd: 0, colEnd: 26, className: 'text-cyan-400' },
    { rowStart: 1, colStart: 2, rowEnd: 1, colEnd: 12, className: 'text-emerald-400 bg-emerald-500/10' },
    { rowStart: 1, colStart: 20, rowEnd: 1, colEnd: 37, className: 'text-yellow-300' },
    { rowStart: 1, colStart: 45, rowEnd: 1, colEnd: 50, className: 'text-emerald-400 animate-pulse' },
    { rowStart: 2, colStart: 2, rowEnd: 2, colEnd: 13, className: 'text-rose-400 bg-rose-500/10' },
    { rowStart: 2, colStart: 20, rowEnd: 2, colEnd: 38, className: 'text-slate-500' },
    { rowStart: 2, colStart: 45, rowEnd: 2, colEnd: 50, className: 'text-rose-400' }
  ],

  // ५. Row of Switches in RAM
  "ram-switches": [
    { rowStart: 0, colStart: 1, rowEnd: 0, colEnd: 45, className: 'text-purple-400' },
    { rowStart: 1, colStart: 70, rowEnd: 1, colEnd: 95, className: 'text-cyan-400' }
  ],

  // ६. RAM मधील स्विचेसची गट (Bytes)
  "byte-groups": [
    { rowStart: 0, colStart: 1, rowEnd: 0, colEnd: 45, className: 'text-pink-400 font-bold' },
    // 🔴 इथे 'matchValue' वापरले आहे, आणि आपण ते इंटरफेसमध्ये दिल्यामुळे आता एरर येणार नाही
    { rowStart: 1, colStart: 2, rowEnd: 1, colEnd: 63, matchValue: /[1१]/, className: 'text-emerald-400 font-bold' },
    { rowStart: 1, colStart: 2, rowEnd: 1, colEnd: 63, matchValue: /[0०]/, className: 'text-rose-400' },
    { rowStart: 3, colStart: 9, rowEnd: 3, colEnd: 24, className: 'text-emerald-400 font-bold bg-emerald-500/10 px-1 rounded' }, 
    { rowStart: 3, colStart: 47, rowEnd: 3, colEnd: 62, className: 'text-sky-400 font-bold bg-sky-500/10 px-1 rounded' }
  ],

  // ७. Byte Structure (8 Bits)
  "byte-structure": [
    { rowStart: 0, colStart: 1, rowEnd: 0, colEnd: 62, className: 'text-orange-400' },
    { rowStart: 2, colStart: 12, rowEnd: 2, colEnd: 12, className: 'text-emerald-400 font-black animate-pulse' },
    { rowStart: 2, colStart: 60, rowEnd: 2, colEnd: 60, className: 'text-emerald-400 font-black animate-pulse' }
  ],

  // ८. Memory Address Table
  "memory-table": [
    { rowStart: 1, colStart: 3, rowEnd: 1, colEnd: 65, className: 'text-sky-400' }, 
    { rowStart: 3, colStart: 23, rowEnd: 6, colEnd: 46, matchValue: /[1१]/, className: 'text-emerald-400 font-black animate-pulse' },
    { rowStart: 3, colStart: 23, rowEnd: 6, colEnd: 46, matchValue: /[0०]/, className: 'text-rose-400 font-medium' },
    { rowStart: 3, colStart: 3, rowEnd: 6, colEnd: 12, className: 'text-amber-400 font-mono' },
    { rowStart: 3, colStart: 51, rowEnd: 6, colEnd: 66, className: 'text-pink-400 font-medium' },
    { rowStart: 3, colStart: 48, rowEnd: 6, colEnd: 48, className: 'text-purple-400 animate-pulse' }
  ],
};