import { Link } from 'react-router-dom';
import PageMeta from '@/components/shared/PageMeta';
import RevealText from '@/components/shared/RevealText';
import SeamLine from '@/components/shared/SeamLine';

const services = [
  ['Website design & build','Business sites, portfolios, landing pages and brand websites with clear structure, responsive implementation and a distinct visual direction.','DISCOVERY / IA / UI / BUILD'],
  ['Front-end development','Implementation of polished interfaces from an existing concept or design system, with reusable components and careful responsive behavior.','REACT / JAVASCRIPT / MOTION'],
  ['Web apps & product UI','Product interfaces, workflows and interactive prototypes where hierarchy and usability matter as much as visual identity.','FLOW / COMPONENTS / STATES'],
  ['Interactive web experiences','Editorial and experimental interfaces for projects that need more atmosphere, movement or narrative than a standard marketing site.','DIRECTION / MOTION / INTERACTION'],
];

export default function Services() {
  return <div className="bg-quartz min-h-screen"><PageMeta title="Services" description="Website design, front-end development, web app interfaces and interactive experiences by Nathan Azoulay."/><section className="pt-32 md:pt-40 pb-20 max-w-[1400px] mx-auto px-6 md:px-10"><RevealText as="p" className="text-eyebrow text-olive mb-4">Capabilities</RevealText><RevealText as="h1" delay={.08} className="font-serif text-[46px] md:text-[78px] leading-[.96] font-light max-w-5xl">From structure to <span className="italic text-deep-green/60">finished interface.</span></RevealText><p className="mt-8 text-[16px] md:text-[18px] text-ink/60 max-w-2xl leading-relaxed">Complete website or focused intervention: structure, visual direction, front-end implementation or interface refinement.</p><SeamLine className="mt-14"/><div className="mt-4">{services.map(([title,body,meta],i)=><section key={title} className="grid md:grid-cols-[90px_1fr_300px] gap-5 md:gap-10 py-9 border-b border-olive/20"><span className="text-[10px] tracking-[0.2em] text-olive">0{i+1}</span><div><h2 className="font-serif text-[28px] md:text-[38px] font-light">{title}</h2><p className="mt-4 text-[14px] md:text-[15px] text-ink/58 leading-relaxed max-w-2xl">{body}</p></div><p className="text-[9px] uppercase tracking-[0.16em] text-olive md:text-right">{meta}</p></section>)}</div><Link to="/contact" className="inline-flex mt-12 px-5 py-3 bg-deep-green text-quartz text-[11px] uppercase tracking-[0.14em]">Discuss a project →</Link></section></div>;
}
