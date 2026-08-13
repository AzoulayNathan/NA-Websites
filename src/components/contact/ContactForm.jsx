import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useI18n } from '@/i18n';
import ProjectTypeSelector from './ProjectTypeSelector';
import { parseContactTypeParam, CONTACT_FORM_TO_QUERY } from '@/lib/contactTypeParams';
import {
  buildContactMailtoHref,
  getContactBriefErrors,
} from '@/lib/contactBriefMailto';

function BriefField({ id, label, error, children, className = '' }) {
  return (
    <div className={`brief-field ${error ? 'brief-field--error' : ''} ${className}`}>
      <label htmlFor={id} className="brief-field-label">
        {label}
      </label>
      {children}
      <span className="brief-field-line" aria-hidden />
      {error ? (
        <p className="brief-field-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function ContactForm({
  initialProjectType = '',
  onProjectTypeChange,
  onBriefChange,
}) {
  const { t } = useI18n();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: initialProjectType,
    budget: '',
    message: '',
    website: '',
  });

  useEffect(() => {
    const fromUrl = parseContactTypeParam(searchParams);
    if (fromUrl) {
      setFormData((prev) => ({ ...prev, projectType: fromUrl }));
      onProjectTypeChange?.(fromUrl);
    }
  }, [searchParams, onProjectTypeChange]);

  useEffect(() => {
    onProjectTypeChange?.(formData.projectType);
  }, [formData.projectType, onProjectTypeChange]);

  useEffect(() => {
    onBriefChange?.(formData);
  }, [formData, onBriefChange]);

  const budgetOptions = [
    { value: 'starter', label: t('contact.budgets.starter') },
    { value: 'standard', label: t('contact.budgets.standard') },
    { value: 'premium', label: t('contact.budgets.premium') },
    { value: 'not-sure', label: t('contact.budgets.notSure') },
  ];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (field === 'projectType') {
      const query = value ? CONTACT_FORM_TO_QUERY[value] : null;
      if (query) navigate(`/contact?type=${query}`, { replace: true });
      else navigate('/contact', { replace: true });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = getContactBriefErrors(formData, t);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const budgetLabel =
      budgetOptions.find((o) => o.value === formData.budget)?.label || formData.budget || '—';

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...formData, type: formData.projectType }),
      });
      if (!response.ok) throw new Error('contact-api');
      window.location.href = '/contact?sent=1';
    } catch {
      window.location.href = buildContactMailtoHref(formData, { t, budgetLabel });
    }
  };

  const typeLabel = formData.projectType ? t(`contact.types.${formData.projectType}`) : null;

  return (
    <form onSubmit={handleSubmit} className="brief-table-form w-full" noValidate id="contact-brief-form">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="brief-website">Website</label>
        <input id="brief-website" name="website" tabIndex={-1} autoComplete="off" value={formData.website} onChange={(e) => handleChange('website', e.target.value)} />
      </div>
      <ProjectTypeSelector
        value={formData.projectType}
        onChange={(v) => handleChange('projectType', v)}
      />

      <div className="brief-table-sheet">
        <div className="brief-table-sheet-edge" aria-hidden />

        {typeLabel && (
          <div className="brief-table-pin">
            <span className="brief-table-pin-label">{t('contact.briefPinned')}</span>
            <span className="brief-table-pin-value">{typeLabel}</span>
          </div>
        )}

        <div className="brief-table-row brief-table-row--split">
          <BriefField id="brief-name" label={t('contact.name')} error={errors.name}>
            <input
              id="brief-name"
              type="text"
              autoComplete="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="brief-field-input"
              placeholder={t('contact.namePlaceholder')}
            />
          </BriefField>
          <BriefField id="brief-email" label={t('contact.emailLabel')} error={errors.email}>
            <input
              id="brief-email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="brief-field-input"
              placeholder={t('contact.emailPlaceholder')}
            />
          </BriefField>
        </div>

        {formData.projectType !== 'freelance' && <div className="brief-table-row">
          <p className="brief-field-label mb-3">{t('contact.budget')}</p>
          <div className="brief-budget-row" role="group" aria-label={t('contact.budget')}>
            {budgetOptions.map((opt) => {
              const active = formData.budget === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleChange('budget', opt.value)}
                  className={`brief-budget-chip ${active ? 'brief-budget-chip--active' : ''}`}
                  aria-pressed={active}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>}

        <div className="brief-table-row">
          <BriefField id="brief-message" label={t('contact.message')} error={errors.message}>
            <textarea
              id="brief-message"
              rows={6}
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              className="brief-field-input brief-field-textarea"
              placeholder={t('contact.messagePlaceholder')}
            />
          </BriefField>
        </div>

        <div className="brief-table-footer">
          <button type="submit" className="brief-table-submit na-seam-hover group">
            <span>{t('contact.send')}</span>
            <ArrowRight className="w-4 h-4 text-olive transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </form>
  );
}
