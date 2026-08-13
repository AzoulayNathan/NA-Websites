/** URL ?type= slugs ↔ form internal keys */
export const CONTACT_QUERY_TO_FORM = {
  'local-business': 'local',
  'product-brand': 'brand',
  'saas-web-app': 'saas',
  'signature-concept': 'signature',
  freelance: 'freelance',
};

export const CONTACT_FORM_TO_QUERY = {
  local: 'local-business',
  brand: 'product-brand',
  saas: 'saas-web-app',
  signature: 'signature-concept',
  freelance: 'freelance',
};

export function parseContactTypeParam(searchParams) {
  const raw = searchParams.get('type');
  if (!raw) return '';
  return CONTACT_QUERY_TO_FORM[raw] || '';
}
