'use client';

import { useScrollReveal } from '@/lib/useScrollReveal';
import { HeroSection } from '@/components/home/HeroSection';
import { IntentGateway } from '@/components/home/IntentGateway';
import { FeaturedProperties } from '@/components/home/FeaturedProperties';
import { SellerStory } from '@/components/home/SellerStory';
import { SocialProof } from '@/components/home/SocialProof';
import { LocalKnowledge } from '@/components/home/LocalKnowledge';
import { PropertyManagement } from '@/components/home/PropertyManagement';
import { TeamSection } from '@/components/home/TeamSection';
import { SoldProof } from '@/components/home/SoldProof';
import { ClosingCta } from '@/components/home/ClosingCta';

/**
 * Client wrapper that mounts the IntersectionObserver for
 * all `.reveal` elements across the homepage sections.
 */
export function HomeClient() {
  const scrollRef = useScrollReveal(0.1, '0px 0px -80px 0px');

  return (
    <div ref={scrollRef as React.RefObject<HTMLDivElement>}>
      <HeroSection />
      <IntentGateway />
      <FeaturedProperties />
      <SellerStory />
      <SocialProof />
      <LocalKnowledge />
      <PropertyManagement />
      <TeamSection />
      <SoldProof />
      <ClosingCta />
    </div>
  );
}
