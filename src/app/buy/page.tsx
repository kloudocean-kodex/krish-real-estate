import type { Metadata } from 'next';
import { MOCK_LISTINGS } from '@/data/mock-listings';
import { BuyClient } from './BuyClient';

export const metadata: Metadata = {
  title: 'Curated Properties for Sale | Melbourne North | Krish Real Estate',
  description:
    'Explore our curated collection of architectural family residences, modern townhomes, and prestige properties for sale across Wollert, Epping, Craigieburn, and Donnybrook.',
  openGraph: {
    title: 'Curated Properties for Sale | Krish Real Estate',
    description: 'Explore architectural residences for sale in Melbourne\'s northern corridor.',
    images: ['/images/hero-property.jpg'],
  },
};

export default function BuyPage() {
  const saleListings = MOCK_LISTINGS.filter(
    (listing) => listing.transactionType === 'sale' && listing.status !== 'sold'
  );

  return <BuyClient initialListings={saleListings} />;
}
