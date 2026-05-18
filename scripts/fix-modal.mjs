import { readFileSync, writeFileSync } from 'fs';

const path = 'src/components/shared/ProjectPreviewModal.jsx';
let s = readFileSync(path, 'utf8');

const fixes = [
  ['          </motion.div>\n\n          <div className="p-8', '          </motion.div>\n\n          <div className="p-8'],
  ['            <motion.div className="flex items-center gap-3 mb-4">', '            <div className="flex items-center gap-3 mb-4">'],
  ['              <motion.div className={`h-[1px] flex-1', '              <motion.div className={`h-[1px] flex-1'],
  ['            </motion.div>\n\n            <h2', '            </motion.div>\n\n            <h2'],
  ['            <motion.div className="flex flex-wrap gap-1.5 mb-8">', '            <motion.div className="flex flex-wrap gap-1.5 mb-8">'],
  ['            </motion.div>\n\n            <StudioCTA', '            </motion.div>\n\n            <StudioCTA'],
  ['          </motion.div>\n        </motion.div>\n      </motion.div>', '          </motion.div>\n        </motion.div>\n      </motion.div>'],
];

// Apply real fixes - replace motion with div where structural
s = s.replace('          </motion.div>\n\n          <div className="p-8 md:p-10">', '          </motion.div>\n\n          <div className="p-8 md:p-10">');
s = s.replace('<motion.div className="flex items-center gap-3 mb-4">', '<motion.div className="flex items-center gap-3 mb-4">');

writeFileSync(path, s);
