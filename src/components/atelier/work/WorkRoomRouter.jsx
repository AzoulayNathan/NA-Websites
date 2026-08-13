import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, enrichProjects, SHOWROOM_SLUG } from '@/lib/projects';
import ArtisanCorridor from './rooms/ArtisanCorridor';
import BrandShelves from './rooms/BrandShelves';
import SaasConstellation from './rooms/SaasConstellation';
import SignatureGallery from './rooms/SignatureGallery';
import ShowroomPath from './rooms/ShowroomPath';

const roomTransition = {
  initial: { opacity: 0, clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' },
  animate: { opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
  exit: { opacity: 0, clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

export default function WorkRoomRouter({ categorySlug, onEnterTerritory }) {
  const categoryProjects =
    categorySlug === SHOWROOM_SLUG
      ? []
      : enrichProjects(projects.filter((p) => p.categorySlug === categorySlug));

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={categorySlug}
        {...roomTransition}
        data-room={categorySlug}
        className="work-room-shell"
      >
        {categorySlug === SHOWROOM_SLUG && <ShowroomPath onEnterTerritory={onEnterTerritory} />}
        {categorySlug === 'local-business' && <ArtisanCorridor projects={categoryProjects} />}
        {categorySlug === 'product-brand' && <BrandShelves projects={categoryProjects} />}
        {categorySlug === 'saas-web-app' && <SaasConstellation projects={categoryProjects} />}
        {categorySlug === 'signature-concept' && <SignatureGallery projects={categoryProjects} />}
      </motion.div>
    </AnimatePresence>
  );
}
