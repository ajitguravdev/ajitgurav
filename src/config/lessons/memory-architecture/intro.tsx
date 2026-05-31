"use client";

// src/config/lessons/javascript/v8-engine.ts
import { StyleZone } from "@/components/markdown/UnicodeDiagram";
import { motion } from "framer-motion";

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
    { rowStart: 1, colStart: 2, rowEnd: 1, colEnd: 63, matchValue: "/[1१]/", isRegex: true, className: 'text-emerald-400 font-bold' },
    { rowStart: 1, colStart: 2, rowEnd: 1, colEnd: 63, matchValue: "/[0०]/", isRegex: true, className: 'text-rose-400' },
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
    { rowStart: 3, colStart: 23, rowEnd: 6, colEnd: 46, matchValue: "/[1१]/", isRegex: true, className: 'text-emerald-400 font-black animate-pulse' },
    { rowStart: 3, colStart: 23, rowEnd: 6, colEnd: 46, matchValue: "/[0०]/", isRegex: true, className: 'text-rose-400 font-medium' },
    { rowStart: 3, colStart: 3, rowEnd: 6, colEnd: 12, className: 'text-amber-400 font-mono' },
    { rowStart: 3, colStart: 51, rowEnd: 6, colEnd: 66, className: 'text-pink-400 font-medium' },
    { rowStart: 3, colStart: 48, rowEnd: 6, colEnd: 48, className: 'text-purple-400 animate-pulse' }
  ],
};


export const CallStackAnimation = () => {
  return (
    <div className="p-4 bg-[var(--bg-surface)] text-[var(--text-main)] rounded-xl border border-[var(--border-base)]">
      <motion.div animate={{ scale: 1.1 }}>
        हाय! मी AI ने बनवलेले ॲनिमेशन आहे.
      </motion.div>
    </div>
  );
};


// 🔴 हा ॲनिमेशन कंपोनंट फाईलच्या सर्वात खाली पेस्ट कर
export const RamDataFlowAnimation = () => {
  return (
    <div className="my-[var(--space-lg)] p-6 md:p-10 bg-[#0d1117] text-[var(--text-main)] rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
      
      {/* बॅकग्राउंड ग्लो इफेक्ट */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[var(--brand-main)]/20 blur-[80px] rounded-full pointer-events-none"></div>

      <h3 className="text-lg font-bold mb-10 text-[var(--text-muted)] tracking-wider uppercase text-center z-10">
        ⚡ CPU ते RAM डेटा ट्रान्सफर
      </h3>

      <div className="flex items-center gap-2 sm:gap-6 w-full max-w-lg justify-between z-10">
        
        {/* १. CPU Block */}
        <motion.div 
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl border-2 border-[var(--brand-main)] flex flex-col items-center justify-center font-bold text-[var(--brand-main)] bg-[var(--brand-main)]/10 shadow-[0_0_15px_var(--brand-main)]"
          animate={{ boxShadow: ["0px 0px 10px #0ea5e9", "0px 0px 25px #0ea5e9", "0px 0px 10px #0ea5e9"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-2xl">CPU</span>
          <span className="text-xs font-mono opacity-70 mt-1">Processor</span>
        </motion.div>

        {/* २. Data Packets Moving (मधील रस्ता) */}
        <div className="relative flex-1 h-12 flex items-center justify-center mx-2 border-y border-dashed border-slate-700">
           {/* डावीकडून उजवीकडे जाणारे डेटा बिट्स */}
           <motion.div
             className="absolute w-4 h-4 rounded-full bg-[var(--color-success)] shadow-[0_0_10px_var(--color-success)]"
             animate={{ x: ["-400%", "400%"], opacity: [0, 1, 1, 0] }}
             transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
           />
           <motion.div
             className="absolute w-4 h-4 rounded-full bg-[var(--brand-main)] shadow-[0_0_10px_var(--brand-main)]"
             animate={{ x: ["-400%", "400%"], opacity: [0, 1, 1, 0] }}
             transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
           />
           <motion.div
             className="absolute w-4 h-4 rounded-full bg-[var(--color-warning)] shadow-[0_0_10px_var(--color-warning)]"
             animate={{ x: ["-400%", "400%"], opacity: [0, 1, 1, 0] }}
             transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 1 }}
           />
        </div>

        {/* ३. RAM Block */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl border-2 border-[var(--color-warning)] flex flex-col items-center justify-center font-bold text-[var(--color-warning)] bg-[var(--color-warning)]/10 relative overflow-hidden">
          <span className="mb-2 text-xl z-10">RAM</span>
          
          {/* RAM मधील लुकलुकणारे मेमरी ब्लॉक्स */}
          <div className="flex gap-1.5 z-10">
            {[1, 2, 3, 4].map(i => (
               <motion.div
                 key={i}
                 className="w-2 h-6 bg-[var(--color-warning)] rounded-sm"
                 animate={{ opacity: [0.2, 1, 0.2] }}
                 transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
               />
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
};