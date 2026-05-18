import { readFileSync, writeFileSync } from 'fs';

const path = 'src/components/shared/ProjectPreviewModal.jsx';
let s = readFileSync(path, 'utf8');

const motionDiv = 'motion' + '.div';
const plainDiv = 'div';

// Fix image wrapper close
s = s.replace(
  '              />\n            </' + motionDiv + '>\n\n            <' + motionDiv + ' className="p-8',
  '              />\n            </' + plainDiv + '>\n\n            <' + plainDiv + ' className="p-8',
);

// Fix header row
s = s.replace(
  '<' + motionDiv + ' className="flex items-center gap-3 mb-4">',
  '<' + plainDiv + ' className="flex items-center gap-3 mb-4">',
);

s = s.replace(
  '            </' + motionDiv + '>\n\n              <h2',
  '            </' + plainDiv + '>\n\n              <h2',
);

// Fix tags row
s = s.replace(
  '<' + motionDiv + ' className="flex flex-wrap gap-1.5 mb-8">',
  '<' + plainDiv + ' className="flex flex-wrap gap-1.5 mb-8">',
);

s = s.replace(
  '            </' + motionDiv + '>\n\n              <StudioCTA',
  '            </' + plainDiv + '>\n\n              <StudioCTA',
);

// Fix content panel close
s = s.replace(
  '              </StudioCTA>\n            </' + motionDiv + '>\n          </' + motionDiv + '>',
  '              </StudioCTA>\n            </' + plainDiv + '>\n          </' + motionDiv + '>',
);

writeFileSync(path, s);
console.log('ok');
