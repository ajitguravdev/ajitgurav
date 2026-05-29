import React from "react";
import { StyleZone } from "@/components/markdown/UnicodeDiagram";

// १. फक्त याच धड्यासाठी लागणारे डायग्राम झोन्स
export const v8EngineZones: Record<string, StyleZone[]> = {
  "call-stack": [
    { rowStart: 0, colStart: 4, rowEnd: 0, colEnd: 13, className: 'text-pink-400 font-bold' },
    // ... इतर नियम
  ],
  "memory-pointers": [
    // ... नियम
  ]
};

// २. फक्त याच धड्यासाठी लागणारे कस्टम कंपोनंट्स (उदा. एखादे खास ॲनिमेशन)
export const V8CustomComponents = {
  // जेव्हा तू MDX मध्ये <v8-memory-animation /> वापरशील, तेव्हा हे रन होईल!
  "v8-memory-animation": () => (
    <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-xl animate-pulse border border-emerald-500/30">
      ही एक जिवंत मेमरी आहे जी फक्त V8 च्या धड्यात दिसेल!
    </div>
  )
};