import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useI18n } from '@/i18n';
import RevealText from '../components/shared/RevealText';
import SeamLine from '../components/shared/SeamLine';
import ContactForm from '../components/contact/ContactForm';

export default function Contact() {
  const { t } = useI18n();

  return (
    <motion.div className="bg-quartz min-h-screen">
      <section className="pt-32 md:pt-40 pb-12 md:pb-16 max-w-[1400px] mx-auto px-6 md:px-10">
        <RevealText as="p" className="text-[11px] uppercase tracking-[0.25em] text-olive/50 mb-4">
          {t('contact.label')}
        </RevealText>
        <RevealText as="h1" delay={0.1} className="font-serif text-[42px] md:text-[68px] lg:text-[78px] leading-[1.05] font-light text-ink">
          {t('contact.heroTitle1')}
        </RevealText>
        <RevealText as="h1" delay={0.2} className="font-serif text-[42px] md:text-[68px] lg:text-[78px] leading-[1.05] font-light text-ink/60 italic">
          {t('contact.heroTitle2')}
        </RevealText>
        <RevealText as="p" delay={0.3} className="mt-6 text-[16px] md:text-[17px] text-ink/45 font-light max-w-xl">
          {t('contact.heroSub')}
        </RevealText>
      </section>

      {/* Form section */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pb-20 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-7">
            <SeamLine className="mb-10" />
            <ContactForm />
          </div>

          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="lg:sticky lg:top-28"
            >
              <SeamLine className="mb-10" />

              <p className="text-[11px] uppercase tracking-[0.2em] text-ink/35 mb-6">
                Direct contact
              </p>

              <a
                href="mailto:nathanazoulay.pro@gmail.com"
                className="group inline-flex items-center gap-3 text-[15px] text-ink/60 hover:text-ink transition-colors duration-300"
              >
                <Mail className="w-4 h-4 text-olive/50" />
                nathanazoulay.pro@gmail.com
              </a>

              <div className="mt-12 p-6 bg-sand/40 rounded-sm">
                <p className="text-[11px] uppercase tracking-[0.2em] text-ink/35 mb-3">
                  What to expect
                </p>
                <div className="space-y-3">
                  {[
                    'A response within 24–48 hours',
                    'A focused conversation about the project',
                    'A clear direction before any commitment',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-3 h-[1px] bg-olive/20 mt-2.5 flex-shrink-0" />
                      <p className="text-[14px] text-ink/45 font-light">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <p className="text-[11px] uppercase tracking-[0.2em] text-ink/25 mb-3">
                  Also available at
                </p>
                <a
                  href="https://na-studio.pages.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-olive/50 hover:text-olive transition-colors duration-300"
                >
                  Nathan / NA Studio →
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final close */}
      <section className="bg-deep-green py-20 md:py-28">
        <div className="max-w-[700px] mx-auto px-6 md:px-10 text-center">
          <RevealText as="p" className="font-serif text-[24px] md:text-[32px] font-light text-quartz/60 italic leading-relaxed">
            "The best websites don't just present information. They make decisions clearer."
          </RevealText>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-[1px] bg-quartz/10 w-16 mx-auto mt-8 origin-center"
          />
        </div>
      </section>
    </motion.div>
  );
}