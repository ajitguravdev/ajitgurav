// src/utils/diagramEngine.ts

export const highlightDiagram = (text: string, type: string) => {
  let html = String(text).replace(/</g, '&lt;').replace(/>/g, '&gt;');

  html = html.replace(/\b(0x[0-9A-Fa-f]+)\b/g, '<span class="text-purple-400 font-mono">$1</span>');
  html = html.replace(/\[0\]/g, '<span class="text-slate-500">[</span><span class="text-rose-400 font-extrabold">0</span><span class="text-slate-500">]</span>');
  html = html.replace(/\[1\]/g, '<span class="text-slate-500">[</span><span class="text-emerald-400 font-extrabold">1</span><span class="text-slate-500">]</span>');
  html = html.replace(/\(\s*0\s*\)/g, '<span class="text-slate-500">(</span><span class="text-rose-400 font-extrabold">0</span><span class="text-slate-500">)</span>');
  html = html.replace(/\(\s*1\s*\)/g, '<span class="text-slate-500">(</span><span class="text-emerald-400 font-extrabold">1</span><span class="text-slate-500">)</span>');
  html = html.replace(/│(\s*)(0)(\s*)(?=(│|⟵))/g, '│$1<span class="text-rose-400 font-extrabold">$2</span>$3');
  html = html.replace(/│(\s*)(1)(\s*)(?=(│|⟵))/g, '│$1<span class="text-emerald-400 font-extrabold">$2</span>$3');
  html = html.replace(/\[([A-Za-z0-9\s_]+)\]/g, '<span class="text-blue-400 font-bold">[$1]</span>');
  html = html.replace(/\(([A-Za-z0-9\s_]+)\)/g, '<span class="text-purple-400 font-bold">($1)</span>');
  html = html.replace(/\b(ON)\b/g, '<span class="text-emerald-400 font-extrabold drop-shadow-md animate-pulse">ON</span>');
  html = html.replace(/\b(OFF)\b/g, '<span class="text-rose-400 font-extrabold drop-shadow-md">OFF</span>');
  html = html.replace(/(⟵|─+&gt;|═+&gt;|&lt;─+|&lt;═+|&lt;&lt;|&gt;&gt;)/g, '<span class="text-amber-400 font-bold">$1</span>');
  html = html.replace(/([┌├│─└┐┘┼┬┴┤╞═]+)/g, '<span class="text-slate-500">$1</span>');

  return html;
};