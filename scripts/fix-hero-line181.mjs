import { readFileSync, writeFileSync } from 'fs';
const p = 'src/components/home/HeroSection.jsx';
const lines = readFileSync(p, 'utf8').split('\n');
// line 181 is index 180
if (lines[180] && lines[180].includes('motion')) {
  lines[180] = '      </div>';
}
writeFileSync(p, lines.join('\n'));
console.log('line 181:', lines[180]);
