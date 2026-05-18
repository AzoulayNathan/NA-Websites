import { readFileSync, writeFileSync } from 'fs';
const p = 'src/components/home/HeroSection.jsx';
let h = readFileSync(p, 'utf8');
h = h.replace(
  '<motion.div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">',
  '<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">',
);
h = h.replace(
  '        </motion.div>\n      </div>\n    </section>',
  '        </div>\n      </motion.div>\n    </section>',
);
// if pattern different:
h = h.replace(
  '        </motion.div>\n      </motion.div>\n    </section>',
  '        </div>\n      </div>\n    </section>',
);
writeFileSync(p, h);
console.log('hero fixed');
