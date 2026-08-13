/** Order projects by slug list; unknown slugs append in original order. */
export function sortProjectsBySlug(projects, slugOrder) {
  const orderMap = new Map(slugOrder.map((s, i) => [s, i]));
  return [...projects].sort((a, b) => {
    const ai = orderMap.has(a.slug) ? orderMap.get(a.slug) : 999;
    const bi = orderMap.has(b.slug) ? orderMap.get(b.slug) : 999;
    if (ai !== bi) return ai - bi;
    return parseInt(a.number, 10) - parseInt(b.number, 10);
  });
}

export function pickProject(projects, slug) {
  return projects.find((p) => p.slug === slug) ?? null;
}
