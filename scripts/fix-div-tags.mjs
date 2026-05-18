import { readFileSync, writeFileSync } from 'fs';

const files = [
  'src/components/shared/ErrorBoundary.jsx',
  'src/components/home/HeroSection.jsx',
];

for (const file of files) {
  let s = readFileSync(file, 'utf8');
  // Fix common mistaken </motion.div> that should close a plain <motion.div
  s = s.replace(
    /(\n\s*)<\/motion\.div>(\n\s*<div className="absolute bottom-3)/g,
    '$1</div>$2',
  );
  s = s.replace(
    /(\n\s*)<\/motion\.motion\.div>(\n\s*<\/motion\.motion\.motion\.div>\n\s*\);\n\}\n\nexport default function HeroSection)/g,
    '$1</div>$2',
  );
  writeFileSync(file, s);
}

// ErrorBoundary: force correct closing tags
writeFileSync(
  'src/components/shared/ErrorBoundary.jsx',
  `import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('NA Websites render error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-quartz flex items-center justify-center px-6">
          <div className="max-w-md text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-olive/50 mb-4">NA Websites</p>
            <h1 className="font-serif text-2xl text-ink font-light mb-3">Something went wrong.</h1>
            <p className="text-sm text-ink/45 font-light mb-6">Try refreshing the page.</p>
            <a href="/" className="text-[12px] uppercase tracking-[0.15em] text-olive hover:text-ink">
              Back to home
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
`,
);

// HeroSection: fix grid section closings
let hero = readFileSync('src/components/home/HeroSection.jsx', 'utf8');
hero = hero.replace(
  '<motion.div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">',
  '<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">',
);
hero = hero.replace(
  /          <\/motion\.div>\n\n          <div className="lg:col-span-7/,
  '          </motion.div>\n\n          <motion.div className="lg:col-span-7',
);
// Fix col-span-5 close
hero = hero.replace(
  '            </motion.div>\n          </motion.div>\n\n          <div className="lg:col-span-7',
  '            </motion.div>\n          </motion.div>\n\n          <motion.div className="lg:col-span-7',
);
// Simpler: read and fix lines 163, 179-181 manually via known good structure
const lines = hero.split('\n');
// Find and fix: after line with StudioCTA secondary, should be </motion.div> for col-span-5
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('lg:col-span-5')) {
    // find closing before lg:col-span-7
    for (let j = i + 1; j < lines.length; j++) {
      if (lines[j].includes('lg:col-span-7')) {
        if (lines[j - 1].trim() === '</motion.div>') lines[j - 1] = '          </motion.div>'.replace('motion.div', 'motion.div');
        break;
      }
    }
  }
}
writeFileSync('src/components/home/HeroSection.jsx', hero);
console.log('done');
