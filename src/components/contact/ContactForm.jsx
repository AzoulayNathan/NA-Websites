import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/i18n';
import ProjectTypeSelector from './ProjectTypeSelector';
import StudioCTA from '../shared/StudioCTA';

const EMAIL = 'nathanazoulay.pro@gmail.com';

export default function ContactForm() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    message: '',
  });

  const budgetOptions = [
    { value: 'starter', label: t('contact.budgets.starter') },
    { value: 'standard', label: t('contact.budgets.standard') },
    { value: 'premium', label: t('contact.budgets.premium') },
    { value: 'not-sure', label: t('contact.budgets.notSure') },
  ];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`NA Websites — ${formData.projectType || 'project'} brief`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nType: ${formData.projectType}\nBudget: ${formData.budget}\n\n${formData.message}`,
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <p className="text-[13px] text-ink/45 font-light">{t('contact.email')}</p>
      <p className="text-[12px] text-ink/30 font-light -mt-4">{t('contact.mailtoNote')}</p>

      <ProjectTypeSelector
        value={formData.projectType}
        onChange={(v) => handleChange('projectType', v)}
      />

      <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <motion.div>
          <label className="text-[11px] uppercase tracking-[0.2em] text-ink/40 block mb-2">
            {t('contact.name')}
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full bg-transparent border-b border-olive/15 focus:border-olive/40 text-[15px] text-ink font-light py-2.5 outline-none"
            placeholder={t('contact.namePlaceholder')}
          />
        </motion.div>
        <motion.div>
          <label className="text-[11px] uppercase tracking-[0.2em] text-ink/40 block mb-2">
            {t('contact.emailLabel')}
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full bg-transparent border-b border-olive/15 focus:border-olive/40 text-[15px] text-ink font-light py-2.5 outline-none"
            placeholder={t('contact.emailPlaceholder')}
          />
        </motion.div>
      </motion.div>

      <motion.div>
        <label className="text-[11px] uppercase tracking-[0.2em] text-ink/40 block mb-3">
          {t('contact.budget')}
        </label>
        <motion.div className="flex flex-wrap gap-2">
          {budgetOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleChange('budget', opt.value)}
              className={`px-4 py-2 rounded-sm border text-[13px] transition-all ${
                formData.budget === opt.value
                  ? 'border-olive bg-sand/50 text-ink font-medium'
                  : 'border-olive/10 text-ink/45 font-light hover:border-olive/25'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </motion.div>
      </motion.div>

      <motion.div>
        <label className="text-[11px] uppercase tracking-[0.2em] text-ink/40 block mb-2">
          {t('contact.message')}
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          rows={5}
          className="w-full bg-transparent border border-olive/10 focus:border-olive/25 rounded-sm text-[15px] text-ink font-light p-4 outline-none resize-none"
          placeholder={t('contact.messagePlaceholder')}
        />
      </motion.div>

      <StudioCTA type="submit" variant="primary">
        {t('contact.send')}
      </StudioCTA>
    </form>
  );
}
