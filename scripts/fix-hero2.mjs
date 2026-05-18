import { readFileSync, writeFileSync } from 'fs';
const p = 'src/components/home/HeroSection.jsx';
let s = readFileSync(p, 'utf8');
const closeMotion = String.fromCharCode(60, 47, 109, 111, 116, 105, 111, 110, 46, 100, 105, 118, 62);
const closeDiv = String.fromCharCode(60, 47, 100, 105, 118, 62);
const idx = s.indexOf('pointer-events-none');
const chunk = s.slice(idx, idx + 400);
console.log(JSON.stringify(chunk.slice(200, 280)));
s = s.replace(
  `          }` + String.fromCharCode(96) + String.fromCharCode(10) + `        />` + String.fromCharCode(10) + `      ${closeMotion}`,
  `          }` + String.fromCharCode(96) + String.fromCharCode(10) + `        />` + String.fromCharCode(10) + `      ${closeDiv}`,
);
writeFileSync(p, s);
