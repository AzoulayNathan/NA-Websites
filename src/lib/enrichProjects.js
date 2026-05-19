import proofData from './projectProof.json';
import { enrichProjectAssets } from './projectAssets';

const proofBySlug = proofData?.projects || {};

export function enrichProject(project) {
  if (!project) return null;
  const proof = proofBySlug[project.slug] || {};
  const merged = {
    ...project,
    ...proof,
    slug: project.slug,
    title: project.title,
    category: project.category,
    categorySlug: project.categorySlug,
    theme: project.theme,
    type: project.type,
    shortPitch: project.shortPitch,
    microLine: project.microLine,
    tags: project.tags,
    featured: project.featured,
    number: project.number,
    translationKey: project.translationKey,
  };
  return enrichProjectAssets(merged, proof);
}

export function enrichProjects(list) {
  return list.map(enrichProject);
}

import { projects as baseProjects } from './projects';

export function getEnrichedProject(slug) {
  const base = baseProjects.find((p) => p.slug === slug);
  return enrichProject(base);
}
