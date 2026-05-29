// src/components/markdown/UnicodeDiagram.tsx
import React from 'react';

// 🔴 हे Export करणे खूप महत्त्वाचे आहे (म्हणजे config फाईलमध्ये वापरता येईल)
export interface StyleZone {
  rowStart: number;
  colStart: number;
  rowEnd: number;
  colEnd: number;
  className: string;
  matchValue?: RegExp | string;
  tooltip?: string;
}

interface UnicodeDiagramProps {
  diagram: string;
  diagramId: string;
  zones?: StyleZone[]; // 🔴 आता झोन्स थेट प्रॉप्समधून येतील
}

export const UnicodeDiagram: React.FC<UnicodeDiagramProps> = ({ diagram, diagramId, zones = [] }) => {
  const cleanDiagram = diagram.replace(/\r/g, '').replace(/\u00A0/g, ' ').replace(/^\n+|\n+$/g, '');
  const lines = cleanDiagram.split('\n');

  const getDefaultClass = (char: string): string => {
    if (/[─│┌┐└┘├┤┬┴┼]/.test(char)) return 'text-slate-500 transition-colors duration-200'; 
    if (/[→←↑↓↔↕↖↗↘↙⇒⇔>]/.test(char)) return 'text-sky-400 font-bold';
    if (/[0-9०-९]/.test(char)) return 'text-amber-400 font-medium';
    if (/[░▒▓█▄▀■]/.test(char)) return 'text-slate-600';
    return 'text-slate-300';
  };

  return (
    <div className="not-prose my-8 w-full max-w-full overflow-x-auto rounded-xl border border-[#30363d] bg-[#0d1117] shadow-xl relative group">
      
      {/* Header */}
      <div className="flex items-center px-4 py-3 bg-[#010409] border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          <span className="ml-4 text-xs font-mono text-slate-400 font-medium tracking-wide uppercase">
            ASCII Visualizer : {diagramId}
          </span>
        </div>
      </div>

      {/* Diagram Body */}
      <div className="p-5 overflow-x-auto custom-scrollbar">
        <pre 
          style={{ fontFamily: "'Consolas', 'Roboto Mono', 'Fira Code', 'Ubuntu Mono', monospace" }}
          className="text-sm leading-[1.2] whitespace-pre selection:bg-blue-500/30 selection:text-white"
        >
          {lines.map((line, rowIndex) => {
            const chars = Array.from(line);
            return (
              <div key={rowIndex} className="block">
                {chars.map((char, colIndex) => {
                  
                  const matchingZone = [...zones].reverse().find((z) => {
                    const inBox = rowIndex >= z.rowStart && rowIndex <= z.rowEnd && colIndex >= z.colStart && colIndex <= z.colEnd;
                    if (!inBox) return false;
                    if (z.matchValue) {
                      if (z.matchValue instanceof RegExp) return z.matchValue.test(char);
                      return z.matchValue === char;
                    }
                    return true;
                  });

                  const className = matchingZone ? matchingZone.className : getDefaultClass(char);
                  
                  return (
                    <span key={colIndex} className={className} title={matchingZone?.tooltip}>
                      {char}
                    </span>
                  );
                })}
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
};