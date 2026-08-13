import PageMeta from '@/components/shared/PageMeta';
import RevealText from '@/components/shared/RevealText';
import SeamLine from '@/components/shared/SeamLine';
import { siteConfig } from '@/lib/siteConfig';

export default function About() {
  return (
    <div className="bg-quartz min-h-screen overflow-hidden">
      <PageMeta title="About" description="About Nathan Azoulay and the approach behind NA Websites." />
      <section className="pt-32 md:pt-40 pb-20 max-w-[1400px] mx-auto px-6 md:px-10">
        <RevealText as="p" className="text-eyebrow text-olive mb-4">About / NA Websites</RevealText>
        <RevealText as="h1" delay={0.08} className="font-serif text-[46px] md:text-[78px] leading-[0.96] font-light max-w-5xl">Design, code and <span className="italic text-deep-green/60">systems thinking.</span></RevealText>
        <div className="grid lg:grid-cols-[1fr_380px] gap-14 mt-12">
          <div className="text-[16px] md:text-[18px] text-ink/62 leading-relaxed font-light space-y-5 max-w-3xl"><p>NA Websites is the web-focused part of my work. I design and build websites, product interfaces and interactive experiences with an emphasis on structure, clarity and visual character.</p><p>My broader background combines business analytics, applied mathematics and data work. I approach interfaces as systems with users, information, constraints and measurable goals — not isolated screens.</p></div>
          <div className="text-sm"><div className="border-t border-olive/20 py-4"><span className="text-[9px] uppercase tracking-[0.18em] text-ink/35">Focus</span><p className="mt-2">Websites · Front-end · Web apps</p></div><div className="border-t border-olive/20 py-4"><span className="text-[9px] uppercase tracking-[0.18em] text-ink/35">Availability</span><p className="mt-2">{siteConfig.availability}</p></div><div className="border-y border-olive/20 py-4 flex flex-wrap gap-4"><a href={siteConfig.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={siteConfig.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={siteConfig.studio} target="_blank" rel="noreferrer">NA Studio ↗</a></div></div>
        </div>
        <SeamLine className="mt-16" />
      </section>
      <section className="bg-deep-green text-quartz py-20 md:py-24"><div className="max-w-[1400px] mx-auto px-6 md:px-10"><p className="text-[10px] uppercase tracking-[0.2em] text-sky-blue">Working stack</p><div className="mt-7 flex flex-wrap gap-2">{siteConfig.stack.map((x)=><span key={x} className="px-3 py-2 border border-quartz/20 text-sm text-quartz/75">{x}</span>)}</div></div></section>
    </div>
  );
}
