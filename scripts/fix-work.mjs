import { readFileSync, writeFileSync } from 'fs';
const p = 'src/pages/Work.jsx';
let s = readFileSync(p, 'utf8');
const closeDiv = String.fromCharCode(60, 47, 100, 105, 118, 62);
const closeMotion = String.fromCharCode(60, 47, 109, 111, 116, 105, 111, 110, 46, 100, 105, 118, 62);
const openDiv = String.fromCharCode(60, 100, 105, 118);

s = s.replace(
  `        <${'motion.div'} initial={{ opacity: 0 }} whileInView`,
  `        <${'motion.div'} initial={{ opacity: 0 }} whileInView`,
);
s = s.replace(
  `          </${'motion.div'}>\n        ${closeMotion}\n      </section>\n    ${closeMotion}`,
  `          </${'motion.div'}>\n        ${closeDiv}\n      </section>\n    ${closeMotion}`,
);
// fix outer cta section wrapper
s = s.replace(
  '        </motion.div>\n      </section>\n    </motion.div>\n  );\n}',
  `        ${closeDiv}\n      </section>\n    ${closeMotion}\n  );\n}`,
);
writeFileSync(p, s);
console.log('fixed work');
