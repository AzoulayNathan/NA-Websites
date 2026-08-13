/** Four distinct studio theme palettes — single source of truth */

export const THEME_KEYS = ['local', 'brand', 'saas', 'signature'];

export const themeTokens = {
  local: {
    bg: '#C8BFA5',
    surface: '#B8AE94',
    text: '#1A1A18',
    muted: '#6B6B60',
    accent: '#3F5A4F',
    deep: '#1F3D33',
    line: 'rgba(63, 90, 79, 0.22)',
    glow: 'rgba(63, 90, 79, 0.18)',
    tailwindBg: 'bg-[#C8BFA5]',
    tailwindPanel: 'bg-[#C8BFA5]/80',
    accentBar: 'bg-olive',
    accentText: 'text-olive',
    borderClass: 'border-olive/25',
  },
  brand: {
    bg: '#DFC8B4',
    surface: '#D4B8A2',
    text: '#1A1A18',
    muted: '#6B5A50',
    accent: '#B5523B',
    deep: '#1F3D33',
    line: 'rgba(181, 82, 59, 0.22)',
    glow: 'rgba(196, 165, 116, 0.25)',
    tailwindBg: 'bg-[#DFC8B4]',
    tailwindPanel: 'bg-[#DFC8B4]/85',
    accentBar: 'bg-terracotta',
    accentText: 'text-terracotta',
    borderClass: 'border-terracotta/30',
  },
  saas: {
    bg: '#B8CCD4',
    surface: '#A8BEC8',
    text: '#1A1A18',
    muted: '#5A6B70',
    accent: '#5A7A8A',
    deep: '#1F3D33',
    line: 'rgba(31, 61, 51, 0.18)',
    glow: 'rgba(175, 200, 209, 0.35)',
    tailwindBg: 'bg-[#B8CCD4]',
    tailwindPanel: 'bg-[#B8CCD4]/85',
    accentBar: 'bg-sky-blue',
    accentText: 'text-sky-blue',
    borderClass: 'border-sky-blue/35',
  },
  signature: {
    bg: '#1F3D33',
    surface: '#243F36',
    text: '#F6F3ED',
    muted: '#A0A090',
    accent: '#AFC8D1',
    deep: '#1A1A18',
    line: 'rgba(175, 200, 209, 0.2)',
    glow: 'rgba(175, 200, 209, 0.15)',
    tailwindBg: 'bg-deep-green',
    tailwindPanel: 'bg-deep-green',
    accentBar: 'bg-sky-blue',
    accentText: 'text-sky-blue',
    borderClass: 'border-sky-blue/25',
  },
};

/** Work page hero backgrounds per category slug */
export const workHeroBg = {
  showroom: '#D5CFC3',
  'local-business': themeTokens.local.bg,
  'product-brand': themeTokens.brand.bg,
  'saas-web-app': themeTokens.saas.bg,
  'signature-concept': themeTokens.signature.bg,
};

/** Category switcher + stage surfaces */
export const workCategoryUi = {
  showroom: {
    activeBg: '#D5CFC3',
    idleBg: '#C9C2B6',
    hoverBg: '#DDD6CA',
    stageBg: 'bg-[#D5CFC3]/92',
    accentBar: 'bg-olive',
    borderClass: 'border-olive/20',
  },
  'local-business': {
    activeBg: themeTokens.local.bg,
    idleBg: '#B5AC92',
    hoverBg: '#CEC4AA',
    stageBg: 'bg-[#C8BFA5]/90',
    accentBar: themeTokens.local.accentBar,
    borderClass: themeTokens.local.borderClass,
  },
  'product-brand': {
    activeBg: themeTokens.brand.bg,
    idleBg: '#D2BBA6',
    hoverBg: '#E8D4C0',
    stageBg: 'bg-[#DFC8B4]/92',
    accentBar: themeTokens.brand.accentBar,
    borderClass: themeTokens.brand.borderClass,
  },
  'saas-web-app': {
    activeBg: themeTokens.saas.bg,
    idleBg: '#A8BEC8',
    hoverBg: '#C4D6DE',
    stageBg: 'bg-[#B8CCD4]/92',
    accentBar: themeTokens.saas.accentBar,
    borderClass: themeTokens.saas.borderClass,
  },
  'signature-concept': {
    activeBg: themeTokens.signature.bg,
    idleBg: 'rgba(31,61,51,0.55)',
    hoverBg: 'rgba(31,61,51,0.75)',
    stageBg: 'bg-deep-green',
    accentBar: themeTokens.signature.accentBar,
    borderClass: themeTokens.signature.borderClass,
  },
};

export function getThemeToken(key) {
  return themeTokens[key] || themeTokens.local;
}

export function getWorkCategoryUi(slug) {
  return workCategoryUi[slug] || workCategoryUi.showroom;
}
