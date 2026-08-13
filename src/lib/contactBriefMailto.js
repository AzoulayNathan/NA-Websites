export const CONTACT_MAILTO = 'nathanazoulay.pro@gmail.com';
export const CONTACT_EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function getContactBriefErrors(formData, t) {
  const errors = {};
  if (!formData.name?.trim()) errors.name = t('contact.errors.nameRequired');
  if (!formData.email?.trim()) {
    errors.email = t('contact.errors.emailRequired');
  } else if (!CONTACT_EMAIL_RE.test(formData.email.trim())) {
    errors.email = t('contact.errors.emailInvalid');
  }
  if (!formData.message?.trim()) errors.message = t('contact.errors.messageRequired');
  return errors;
}

export function isContactBriefReady(formData, t) {
  return Object.keys(getContactBriefErrors(formData, t)).length === 0;
}

export function buildContactMailtoHref(formData, { t, budgetLabel }) {
  const typeLabel = formData.projectType ? t(`contact.types.${formData.projectType}`) : '—';
  const budget = budgetLabel || formData.budget || '—';
  const subject = encodeURIComponent('NA Websites — Project brief');
  const body = encodeURIComponent(
    [
      `Name: ${formData.name.trim()}`,
      `Email: ${formData.email.trim()}`,
      `Project type: ${typeLabel}`,
      `Budget range: ${budget}`,
      '',
      formData.message.trim(),
    ].join('\n'),
  );
  return `mailto:${CONTACT_MAILTO}?subject=${subject}&body=${body}`;
}
