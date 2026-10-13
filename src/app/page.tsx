import type { Metadata } from 'next';
import { HomeClient } from '@/components/home/HomeClient';
import { JsonLdWebSite } from '@/components/seo/JsonLd';
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
import { getActiveListings, getSoldListings } from '@/data/listing-summaries';

export const metadata: Metadata = {
  alternates: {canonical: '/'},
  title: {absolute: 'Krish Real Estate | Wollert & Melbourne North'},
  description:
    'Working together means winning together. Personal real estate service in Wollert, Epping, Craigieburn and Donnybrook: sales, property management and appraisals.',
};

export default function HomePage() {
  const sale = getActiveListings('sale');
  const rent = getActiveListings('rent');
  const results = getSoldListings();
  const sold = results.filter(l => l.status === 'sold');
  const leased = results.filter(l => l.status === 'leased');
  return (
    <>
      <JsonLdWebSite />
      <HomeClient>
        <HeroSection />
        <IntentGateway />
        <FeaturedProperties previews={{ sale: sale.slice(0, 3), rent: rent.slice(0, 3) }}
          counts={{ sale: sale.length, rent: rent.length }} />
        <SellerStory />
        <SocialProof />
        <LocalKnowledge />
        <PropertyManagement />
        <TeamSection />
        <SoldProof allResults={[...sold.slice(0, 4), ...leased.slice(0, 4)]}
          counts={{ all: results.length, sold: sold.length, leased: leased.length }} />
        <ClosingCta />
      </HomeClient>
    </>
  );
}
