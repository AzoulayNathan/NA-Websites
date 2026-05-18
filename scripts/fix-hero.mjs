import { readFileSync, writeFileSync } from 'fs';
const p = 'src/components/home/HeroSection.jsx';
let s = readFileSync(p, 'utf8');
const closeDiv = String.fromCharCode(60, 47, 100, 105, 118, 62);
const closeMotion = String.fromCharCode(60, 47, 109, 111, 116, 105, 111, 110, 46, 100, 105, 118, 62);
const openDiv = String.fromCharCode(60, 100, 105, 118);

s = s.replace(
  `        />\n      ${closeMotion}\n      ${openDiv} className="absolute bottom-3`,
  `        />\n      ${closeDiv}\n      ${openDiv} className="absolute bottom-3`,
);
s = s.replace(
  `${openDiv} className="absolute bottom-3 left-3 right-3">`,
  `${openDiv} className="absolute bottom-3 left-3 right-3">`,
);
// bottom was motion.div - fix open tag only if still motion
s = s.replace(
  '<motion.div className="absolute bottom-3 left-3 right-3">',
  `${openDiv} className="absolute bottom-3 left-3 right-3">`,
);
s = s.replace(
  `        </p>\n      ${closeMotion}\n    ${closeMotion}\n  );\n}\n\nexport default function HeroSection`,
  `        </p>\n      ${closeDiv}\n    ${closeMotion}\n  );\n}\n\nexport default function HeroSection`,
);
writeFileSync(p, s);
console.log('fixed hero');
