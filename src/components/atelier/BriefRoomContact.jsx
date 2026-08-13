import React from 'react';
import ContactForm from '@/components/contact/ContactForm';
import ContactStudioRail from '@/components/contact/ContactStudioRail';
import SeamLine from '@/components/shared/SeamLine';

export default function BriefRoomContact({
  initialProjectType,
  selectedType,
  onProjectTypeChange,
  onBriefChange,
}) {
  const railType = selectedType ?? initialProjectType ?? '';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 min-w-0">
      <div id="contact-brief-anchor" className="lg:col-span-8 order-1 scroll-mt-24">
        <SeamLine className="mb-8" />
        <ContactForm
          initialProjectType={initialProjectType}
          onProjectTypeChange={onProjectTypeChange}
          onBriefChange={onBriefChange}
        />
      </div>
      <div className="lg:col-span-4 order-2">
        <ContactStudioRail selectedType={railType} />
      </div>
    </div>
  );
}
