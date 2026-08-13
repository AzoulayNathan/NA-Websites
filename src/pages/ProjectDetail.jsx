import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import PageMeta from '@/components/shared/PageMeta';
import ProjectGalleryFrame from '@/components/atelier/ProjectGalleryFrame';
import ProjectVisualFrame from '@/components/shared/ProjectVisualFrame';
import ThemeTexture from '@/components/shared/ThemeTexture';
import SeamLine from '@/components/shared/SeamLine';
import NABubbleCTA from '@/components/atelier/NABubbleCTA';
import { getEnrichedProject } from '@/lib/projects';
import { getWorkCategoryUi } from '@/lib/themeTokens';
import { useI18n, useProjectText } from '@/i18n';

const statusLabel = {
  concept: 'Concept',
  prototype: 'Prototype',
  personal: 'Personal project',
  live: 'Live',
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getEnrichedProject(slug);
  const { t } = useI18n();
  const copy = useProjectText(project);
  if (!project) return <Navigate to="/work" replace />;
  const dark = project.theme === 'signature';
  const categoryUi = getWorkCategoryUi(project.categorySlug);
  const evidence = project.proofUrl || project.cloudflareUrl;
  const github = project.githubUrl;
  const surface = dark ? 'bg-deep-green text-quartz' : 'bg-quartz text-ink';
  const muted = dark ? 'text-quartz/62' : 'text-ink/58';
  const accent = dark ? 'text-sky-blue' : 'text-olive';
  const border = dark ? 'border-sky-blue/15' : 'border-olive/20';

  return (
    <article className={`min-h-screen overflow-x-hidden ${surface}`}>
      <PageMeta title={project.title} description={copy.shortPitch} type="article" />
      <ThemeTexture theme={project.theme} className="fixed" />

      <header className="relative pt-28 md:pt-36 pb-14 md:pb-20 overflow-hidden">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute top-0 left-0 right-0 h-[3px] origin-left ${categoryUi.accentBar}`}
        />
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          <Link to="/work" className={`inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] ${muted} hover:opacity-100`}>
            <ArrowLeft className="w-4 h-4" /> {t('nav.work')}
          </Link>

          <div className="grid lg:grid-cols-[1fr_340px] gap-10 lg:gap-16 mt-10 items-end">
            <div>
              <p className={`text-[10px] uppercase tracking-[0.24em] ${accent}`}>{copy.category} · {project.number}</p>
              <h1 className="font-serif text-[clamp(3.2rem,8vw,7.4rem)] leading-[0.9] font-light mt-4 tracking-tight">
                {project.title}
              </h1>
              <p className={`mt-7 text-[16px] md:text-[20px] leading-relaxed max-w-3xl font-light ${muted}`}>{copy.shortPitch}</p>
            </div>
            <dl className={`grid grid-cols-2 lg:grid-cols-1 gap-5 border-t ${border} pt-5`}>
              <div><dt className={`text-[9px] uppercase tracking-[0.18em] ${muted}`}>Status</dt><dd className="mt-1 text-sm">{statusLabel[project.status] || project.status}</dd></div>
              <div><dt className={`text-[9px] uppercase tracking-[0.18em] ${muted}`}>Role</dt><dd className="mt-1 text-sm">{project.role}</dd></div>
              <div><dt className={`text-[9px] uppercase tracking-[0.18em] ${muted}`}>Type</dt><dd className="mt-1 text-sm">{copy.type || project.type}</dd></div>
            </dl>
          </div>
        </div>
      </header>

      <section className="max-w-[1540px] mx-auto px-4 md:px-8 relative z-10">
        <ProjectGalleryFrame
          project={project}
          roomType={project.categorySlug === 'local-business' ? 'artisans' : project.theme}
          layout={project.theme === 'brand' ? 'productWide' : project.theme === 'signature' ? 'cinematic' : 'default'}
          className={`w-full min-h-[300px] md:min-h-[580px] ${border}`}
          interactive={false}
        />
      </section>

      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24 relative z-10">
        <SeamLine className={dark ? '!bg-sky-blue/15' : ''} />
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 py-14 md:py-20">
          <div>
            <p className={`text-[10px] uppercase tracking-[0.22em] ${accent}`}>Challenge</p>
            <h2 className="font-serif text-[32px] md:text-[46px] leading-tight font-light mt-3">What needed to work.</h2>
            <p className={`mt-5 text-[15px] md:text-[17px] leading-relaxed font-light ${muted}`}>{project.challenge}</p>
          </div>
          <div>
            <p className={`text-[10px] uppercase tracking-[0.22em] ${accent}`}>Approach</p>
            <h2 className="font-serif text-[32px] md:text-[46px] leading-tight font-light mt-3">How the interface responds.</h2>
            <p className={`mt-5 text-[15px] md:text-[17px] leading-relaxed font-light ${muted}`}>{project.solution}</p>
          </div>
        </div>
        <SeamLine className={dark ? '!bg-sky-blue/15' : ''} />
      </section>

      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pb-16 md:pb-24 relative z-10">
        <div className="grid lg:grid-cols-[1fr_360px] gap-8 md:gap-12 items-start">
          <div className={`border ${border} min-h-[320px] md:min-h-[520px] overflow-hidden`}>
            <ProjectVisualFrame project={{ ...project, coverImage: project.coverImage }} className="w-full h-full min-h-[320px] md:min-h-[520px]" interactive={false} instant />
          </div>
          <div className={`border ${border} p-5 md:p-6 ${dark ? 'bg-quartz/5' : 'bg-sand/30'}`}>
            <div className="mx-auto max-w-[280px] min-h-[420px] overflow-hidden border border-olive/10">
              <img src={project.mobileScreenshot} alt={`${project.title} mobile interface`} className="w-full h-auto object-cover object-top" loading="lazy" />
            </div>
            <p className={`mt-6 text-[10px] uppercase tracking-[0.2em] ${accent}`}>Built around</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {copy.tags.map((tag) => <span key={tag} className={`text-[9px] uppercase tracking-[0.12em] px-2.5 py-1.5 border ${border}`}>{tag}</span>)}
            </div>
          </div>
        </div>

        {project.outcome && (
          <div className={`mt-12 md:mt-16 border-l-2 ${dark ? 'border-sky-blue/50' : 'border-terracotta/50'} pl-6 max-w-4xl`}>
            <p className={`text-[10px] uppercase tracking-[0.2em] ${accent}`}>Result</p>
            <p className={`font-serif text-[26px] md:text-[38px] leading-snug font-light mt-3 ${dark ? 'text-quartz' : 'text-ink'}`}>{project.outcome}</p>
          </div>
        )}
      </section>

      <section className={`${dark ? 'bg-[#172f28]' : 'bg-deep-green'} text-quartz relative overflow-hidden`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24 grid md:grid-cols-[1fr_auto] gap-10 items-end relative z-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-sky-blue">Evidence / next step</p>
            <h2 className="font-serif text-[34px] md:text-[54px] leading-tight font-light mt-3 max-w-3xl">Inspect the proof or build something with the same level of intent.</h2>
            <div className="mt-7 flex flex-wrap gap-3">
              {evidence && <a href={evidence} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 border border-quartz/25 text-[11px] uppercase tracking-[0.14em]">Live project <ArrowUpRight className="w-4 h-4" /></a>}
              {github && <a href={github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 border border-quartz/25 text-[11px] uppercase tracking-[0.14em]">Source <ArrowUpRight className="w-4 h-4" /></a>}
            </div>
          </div>
          <NABubbleCTA to={`/contact?type=${project.categorySlug}`} label="Discuss a project" sublabel="Website / interface / collaboration" theme={project.theme} variant="reveal" />
        </div>
      </section>
    </article>
  );
}
