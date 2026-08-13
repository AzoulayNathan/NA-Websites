import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useI18n } from '@/i18n';
import { siteConfig } from '@/lib/siteConfig';
import { getEnrichedProject } from '@/lib/projects';
import ProjectGalleryFrame from '@/components/atelier/ProjectGalleryFrame';
import NABubbleCTA from '@/components/atelier/NABubbleCTA';
import RevealText from '@/components/shared/RevealText';
import SeamLine from '@/components/shared/SeamLine';

const PROOF_SLUGS = ['atelier-nova-habitat', 'dropdrop', 'questline'];
const MODE_THEME = [
  { bar: 'bg-olive', wash: 'from-[#C8BFA5]/50' },
  { bar: 'bg-terracotta', wash: 'from-[#DFC8B4]/55' },
  { bar: 'bg-sky-blue', wash: 'from-[#B8CCD4]/60' },
];

export default function ProcessCollaborationRoom() {
  const { t, raw } = useI18n();
  const modes = raw('process.collaboration.modes') || [];
  const projects = PROOF_SLUGS.map(getEnrichedProject).filter(Boolean);

  return (
    <section id="work-together" className="scroll-mt-24 relative overflow-hidden border-t border-olive/10 bg-sand/35">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -left-[12%] top-[10%] w-[62%] h-[34%] rotate-[-8deg] bg-gradient-to-r from-quartz via-[#E8DFC9]/60 to-transparent" />
        <div className="absolute right-[-14%] top-[32%] w-[54%] h-[36%] rotate-[9deg] bg-gradient-to-l from-deep-green/10 via-olive/8 to-transparent" />
        <div className="absolute left-[8%] right-[8%] top-[46%] h-px bg-gradient-to-r from-transparent via-olive/20 to-transparent" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-8">
            <RevealText as="p" className="text-eyebrow mb-4">
              {t('process.collaboration.label')}
            </RevealText>
            <RevealText as="h2" delay={0.06} className="font-serif text-[36px] md:text-[58px] lg:text-[68px] leading-[1.02] font-light text-ink max-w-4xl">
              {t('process.collaboration.title1')}
              <br />
              <span className="italic text-deep-green/70">{t('process.collaboration.title2')}</span>
            </RevealText>
            <RevealText as="p" delay={0.12} className="mt-6 text-[15px] md:text-[17px] leading-relaxed text-ink/65 font-light max-w-2xl">
              {t('process.collaboration.sub')}
            </RevealText>
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 border-t border-olive/25 pt-4"
          >
            <p className="text-[9px] uppercase tracking-[0.22em] text-olive mb-2">{t('process.collaboration.availability')}</p>
            <p className="font-serif text-[22px] leading-snug text-ink">{siteConfig.availability}</p>
            <p className="mt-6 text-[9px] uppercase tracking-[0.22em] text-olive mb-2">{t('process.collaboration.links')}</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-ink/65">
              <a href={siteConfig.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-deep-green">
                LinkedIn <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a href={siteConfig.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-deep-green">
                GitHub <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.aside>
        </div>

        <SeamLine className="my-12 md:my-16" />

        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {modes.map((mode, i) => {
            const theme = MODE_THEME[i % MODE_THEME.length];
            return (
              <motion.article
                key={mode.number || mode.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`relative overflow-hidden border border-olive/15 bg-gradient-to-br ${theme.wash} via-quartz/70 to-quartz p-6 md:p-7 min-h-[220px]`}
              >
                <span className={`absolute left-0 top-0 h-[3px] w-full ${theme.bar}`} aria-hidden />
                <p className="text-[9px] tracking-[0.26em] text-olive/70">{mode.number}</p>
                <h3 className="font-serif text-[24px] md:text-[27px] font-light text-ink mt-6">{mode.title}</h3>
                <p className="mt-4 text-[13px] md:text-[14px] leading-relaxed text-ink/60 font-light">{mode.body}</p>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-20 md:mt-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-9">
            <div>
              <p className="text-eyebrow mb-2">{t('process.collaboration.proofLabel')}</p>
              <h3 className="font-serif text-[28px] md:text-[42px] leading-tight font-light text-ink max-w-2xl">
                {t('process.collaboration.proofTitle')}
              </h3>
            </div>
            <Link to="/work" className="na-seam-hover text-[10px] uppercase tracking-[0.18em] text-olive hover:text-deep-green">
              {t('featured.cta')} →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: i * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link to={`/work/${project.slug}`} className="block group">
                  <ProjectGalleryFrame
                    project={project}
                    interactive={false}
                    showTitle
                    showCta
                    ctaLabel={t('work.cursorOpen')}
                    className="min-h-[260px] md:min-h-[310px]"
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-14 md:mt-20 border-y border-olive/15 py-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <span className="text-[9px] uppercase tracking-[0.22em] text-olive shrink-0">{t('process.collaboration.stackLabel')}</span>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {siteConfig.stack.map((item) => (
              <span key={item} className="text-[11px] uppercase tracking-[0.11em] text-ink/50">{item}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative bg-deep-green text-quartz py-20 md:py-28">
        <div className="absolute inset-0 pointer-events-none opacity-30" aria-hidden style={{ background: 'radial-gradient(circle at 22% 20%, rgba(175,200,209,.16), transparent 34%)' }} />
        <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-14">
          <div className="max-w-2xl">
            <p className="text-[9px] uppercase tracking-[0.24em] text-sky-blue/70">{t('process.collaboration.ctaEyebrow')}</p>
            <h3 className="font-serif text-[34px] md:text-[52px] leading-[1.08] font-light mt-3">{t('process.collaboration.ctaTitle')}</h3>
          </div>
          <NABubbleCTA
            to="/contact?type=freelance"
            label={t('process.collaboration.cta')}
            sublabel={t('process.collaboration.ctaSub')}
            variant="reveal"
            theme="signature"
          />
        </div>
      </div>
    </section>
  );
}
