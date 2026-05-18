import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/i18n';

const optionKeys = ['local', 'brand', 'saas', 'signature', 'unsure'];

export default function ProjectTypeSelector({ value, onChange }) {
  const { t } = useI18n();

  return (
    <motion.div>
      <p className="text-[11px] uppercase tracking-[0.2em] text-ink/40 mb-4">
        {t('contact.projectTypeQuestion')}
      </p>
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {optionKeys.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`text-left px-4 py-3.5 rounded-sm border transition-all duration-300 ${
              value === key
                ? 'border-olive bg-sand/50'
                : 'border-olive/10 hover:border-olive/25 bg-transparent'
            }`}
          >
            <span
              className={`text-[14px] transition-colors ${
                value === key ? 'text-ink font-medium' : 'text-ink/55 font-light'
              }`}
            >
              {t(`contact.types.${key}`)}
            </span>
          </button>
        ))}
      </motion.div>

      {value && (
        <motion.p
          key={value}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-[14px] text-olive/70 font-light italic"
        >
          {t(`contact.helpers.${value}`)}
        </motion.p>
      )}
    </motion.div>
  );
}
