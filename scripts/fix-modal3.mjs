import { readFileSync, writeFileSync } from 'fs';
const p = 'src/components/shared/ProjectPreviewModal.jsx';
let s = readFileSync(p, 'utf8');
s = s.replace('<motion.div className="p-8 md:p-10">', '<div className="p-8 md:p-10">');
s = s.replace('<motion.div className="flex items-center gap-3 mb-4">', '<div className="flex items-center gap-3 mb-4">');
writeFileSync(p, s);
console.log('fixed');
