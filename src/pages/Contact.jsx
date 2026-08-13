import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ContactBackgroundLayers from '../components/contact/ContactBackgroundLayers';
import ContactBriefHero from '../components/contact/ContactBriefHero';
import BriefRoomContact from '@/components/atelier/BriefRoomContact';
import ContactSignatureClose from '@/components/contact/ContactSignatureClose';
import { parseContactTypeParam } from '@/lib/contactTypeParams';
import PageMeta from '@/components/shared/PageMeta';
import { useI18n } from '@/i18n';

const EMPTY_BRIEF = {
  name: '',
  email: '',
  projectType: '',
  budget: '',
  message: '',
};

export default function Contact() {
  const [searchParams] = useSearchParams();
  const { t } = useI18n();
  const initialType = parseContactTypeParam(searchParams) || '';
  const [selectedType, setSelectedType] = useState(initialType);
  const [briefForm, setBriefForm] = useState({ ...EMPTY_BRIEF, projectType: initialType });

  return (
    <div className="relative bg-quartz min-h-screen overflow-x-hidden">
      <PageMeta title="Contact" description="Start a website, front-end, web app or freelance conversation with Nathan Azoulay." />
      {searchParams.get('sent') === '1' && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[70] bg-deep-green text-quartz px-5 py-3 border border-olive/40 shadow-lg text-[12px] tracking-[0.04em]" role="status">
          {t('contact.sent')}
        </div>
      )}
      <ContactBackgroundLayers selectedType={selectedType} />

      <ContactBriefHero />

      <section className="relative max-w-[1600px] mx-auto px-5 sm:px-6 md:px-10 pb-14 md:pb-20 min-w-0">
        <BriefRoomContact
          initialProjectType={initialType}
          selectedType={selectedType}
          onProjectTypeChange={setSelectedType}
          onBriefChange={setBriefForm}
        />
      </section>

      <ContactSignatureClose formData={briefForm} selectedType={selectedType} />
    </div>
  );
}
