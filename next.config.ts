// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // तुला भविष्यात खरोखरच जे नियम लावायचे असतील, तेच इथे ऍड कर.
      // सध्या आपण ती उदाहरणे काढून टाकत आहोत जेणेकरून तुझी मूळ वेबसाईट व्यवस्थित चालेल.
      
      
      /* 
        नियम १: जर Middleware ने आधीच भाषा लावली असेल (उदा. /en/resume किंवा /mr/resume)
        तर त्याला त्याच भाषेच्या portfolio वर पाठवा.
      */
      {
        source: "/:lang(mr|hi|en)/resume",
        destination: "/:lang/portfolio",
        permanent: true,
      },
      /* 
        नियम २: जर युजर थेट /resume वर आला (कधीकधी Middleware बायपास झाले तर)
      */
      {
        source: "/resume",
        destination: "/en/portfolio", // थेट इंग्रजी पोर्टफोलिओवर पाठवा
        permanent: true,
      }
    ];
  },
};

export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   async redirects() {
//     return [
//       /*
//         -----------------------------------------------------------
//         नियम १: एखादा सिंगल लेसन डिलीट केला किंवा नाव बदलले तर...
//         उदा: तू 'wrong-lesson' डिलीट केला आणि युजरला 'introduction' वर पाठवायचे आहे.
//         -----------------------------------------------------------
//       */
//       {
//         // :lang(mr|hi|en) यामुळे एकाच लाईनमध्ये तिन्ही भाषा कव्हर होतात!
//         source: "/:lang(mr|hi|en)/react/wrong-lesson",
//         destination: "/:lang/react/default",
//         permanent: true, // हे अत्यंत महत्वाचे! 'true' म्हणजे 301 (कायमस्वरूपी) आणि 'false' म्हणजे 302 (तात्पुरते)
//       },

//       /*
//         -----------------------------------------------------------
//         नियम २: एखादा पूर्ण विषयच (Subject) बदलला किंवा डिलीट केला तर...
//         उदा: 'computer-memory' चे नाव बदलून फक्त 'memory' केले.
//         -----------------------------------------------------------
//       */
//       {
//         // :slug* मुळे त्या विषयाच्या आतले सर्व धडे आपोआप नवीन विषयाकडे वळवले जातील.
//         source: "/:lang(mr|hi|en)/computer-memory/:slug*",
//         destination: "/:lang/memory/:slug*",
//         permanent: true,
//       },

//       /*
//         -----------------------------------------------------------
//         नियम ३: जर एखादे पेज कायमचे डिलीट केले आणि नवीन पर्याय नसेल तर...
//         त्याला सरळ त्या विषयाच्या मुख्य पानावर (किंवा होम पेजवर) पाठवा.
//         -----------------------------------------------------------
//       */
//       {
//         source: "/:lang(mr|hi|en)/javascript/old-deleted-page",
//         destination: "/:lang/javascript",
//         permanent: true,
//       },
//     ];
//   },
// };

// export default nextConfig;

/*
हे कसे काम करेल आणि याचे फायदे काय? (The Magic)
१. SEO १००% सुरक्षित: इथे आपण permanent: true दिले आहे. याचा अर्थ हा 301 HTTP Status Code आहे. जेव्हा गुगलचा बॉट जुन्या लिंकवर येईल, तेव्हा सर्वर त्याला सांगेल, "मित्रा, हा पत्ता कायमचा बदलला आहे, नवीन पत्ता हा आहे. कृपया तुझे जुने SEO चे पॉईंट्स या नवीन पत्त्यावर ट्रान्सफर कर." यामुळे तुझा रँक अजिबात घसरणार नाही!
२. भाषेचा डायनॅमिक सपोर्ट: आपण /:lang(mr|hi|en)/ वापरले आहे. याचा अर्थ तुला mr, hi, आणि en साठी ३ वेगळ्या ओळी लिहिण्याची गरज नाही.
  जर युजरने [ajitgurav.com/hi/react/wrong-lesson](https://ajitgurav.com/hi/react/wrong-lesson) टाकले, तर तो आपोआप .../hi/react/default वर जाईल (हिंदीतच राहील).
  ३. सर्वात जलद गती (Server-level execution): हे Redirects आपले React पेजेस लोड होण्याआधीच (Server च्या दारातच) होतात, त्यामुळे युजरला लोड होण्यासाठी एक सेकंदही वाट पाहावी लागत नाही.
*/
