import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/lib/useScrollReveal';
import RevealText from '../shared/RevealText';
import ThemeTexture from '../shared/ThemeTexture';
import { useI18n } from '@/i18n';
import { themeTokens } from '@/lib/themeTokens';

const TYPE_KEYS = ['local', 'brand', 'saas', 'signature'];

const typeStyle = {
  local: { theme: 'local', bg: themeTokens.local.tailwindPanel, accentText: themeTokens.local.accentText, contactType: 'local-business' },
  brand: { theme: 'brand', bg: themeTokens.brand.tailwindPanel, accentText: themeTokens.brand.accentText, contactType: 'product-brand' },
  saas: { theme: 'saas', bg: themeTokens.saas.tailwindPanel, accentText: themeTokens.saas.accentText, contactType: 'saas-web-app' },
  signature: { theme: 'signature', bg: themeTokens.signature.tailwindPanel, accentText: themeTokens.signature.accentText, contactType: 'signature-concept' },
};

export default function ProjectTypeEmphasis() {
  const { t, raw } = useI18n();
  const [active, setActive] = useState(0);
  const [ref, visible] = useScrollReveal(0.08);

  const types = TYPE_KEYS.map((key) => {
    const copy = raw(`projectTypes.${key}`) || {};
    return { key, ...typeStyle[key], ...copy };
  });

  return (
    <section className="py-24 md:py-32 bg-quartz/60">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <RevealText as="p" className="text-[10px] uppercase tracking-[0.25em] text-olive/50 mb-3">
          {t('process.methodByType')}
        </RevealText>
        <RevealText as="h2" delay={0.08} className="font-serif text-[28px] md:text-[44px] leading-[1.1] font-light text-ink mb-14">
          {t('process.methodByTypeTitle')}
        </RevealText>

        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-4 gap-3 lg:gap-0 lg:-space-x-4"
        >
          {types.map((type, i) => (
            <motion.div
              key={type.key}
              initial={{ opacity: 0, y: 16 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setActive(i)}
              className={`relative overflow-hidden na-diagonal-clip transition-all duration-500 min-h-[200px] lg:min-h-[280px] lg:z-[${10 - i}] ${
                active === i ? `${type.bg} lg:scale-[1.02] shadow-lg` : 'bg-quartz border border-olive/10 lg:opacity-90'
              }`}
              style={{ zIndex: active === i ? 20 : 10 - i }}
            >
              <ThemeTexture theme={type.theme === 'brand' ? 'local' : type.theme} />

              <motion.div
                animate={{ scaleX: active === i ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute top-0 left-0 right-0 h-[2px] ${
                  type.theme === 'local' || type.theme === 'brand' ? 'bg-olive' : 'bg-sky-blue'
                } origin-left`}
              />

              <div className="relative p-8 md:p-10 flex flex-col min-h-full">
                <p className={`text-[9px] uppercase tracking-[0.25em] mb-3 ${
                  active === i
                    ? (type.theme === 'signature' ? 'text-quartz/40' : 'text-olive/55')
                    : 'text-ink/25'
                }`}>{type.meta}</p>

                <h3 className={`text-[11px] uppercase tracking-[0.18em] font-medium mb-4 transition-colors ${
                  active === i ? (type.theme === 'signature' ? 'text-quartz/75' : type.accentText) : 'text-ink/45'
                }`}>{type.label}</h3>

                <p className={`font-serif text-[20px] md:text-[24px] leading-[1.2] font-light mb-6 transition-all duration-400 flex-grow ${
                  active === i ? (type.theme === 'signature' ? 'text-quartz' : 'text-ink') : 'text-ink/60'
                }`}>{type.headline}</p>

                <div className="space-y-2.5 mb-8">
                  {(type.focus || []).map((item, j) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <div
                        className={`h-[1px] w-4 ${
                          type.theme === 'signature' ? 'bg-quartz/25' : 'bg-olive/30'
                        }`}
                      />
                      <p className={`text-[13px] font-light ${
                        active === i ? (type.theme === 'signature' ? 'text-quartz/60' : 'text-ink/60') : 'text-ink/35'
                      }`}>{item}</p>
                    </div>
                  ))}
                </div>

                <Link
                  to={`/contact?type=${type.contactType}`}
                  className={`group inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] font-medium mt-auto ${
                    active === i
                      ? (type.theme === 'signature' ? 'text-quartz/85' : 'text-ink')
                      : 'text-ink/50'
                  }`}
                >
                  <span>{t(`process.typeCta.${type.key}`)}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
