import { readFileSync, writeFileSync } from 'fs';
const p = 'src/components/home/HeroSection.jsx';
const lines = readFileSync(p, 'utf8').split('\n');
const divClose = '      </div>';
const divClose10 = '          </motion.div>'.replace('motion.div', 'div');
const divClose12 = '            </motion.div>'.replace('motion.div', 'motion.div');

function setDivClose(idx, indent) {
  lines[idx] = ' '.repeat(indent) + '</div>';
}

setDivClose(69, 6);
setDivClose(162, 10);
setDivClose(177, 12);
setDivClose(178, 10);
setDivClose(180, 6);
writeFileSync(p, lines.join('\n'));
console.log('lines fixed', lines[69], lines[162]);
