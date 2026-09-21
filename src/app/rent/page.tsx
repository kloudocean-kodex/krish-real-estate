import type { Metadata } from 'next';
import { MOCK_LISTINGS } from '@/data/mock-listings';
import { RentClient } from './RentClient';

export const metadata: Metadata = {
  title: 'Executive Residences for Lease | Melbourne North | Krish Real Estate',
  description:
    'Browse our curated collection of executive family homes and modern residences for lease across Wollert, Epping, Craigieburn, and Donnybrook.',
  openGraph: {
    title: 'Executive Residences for Lease | Krish Real Estate',
    description: 'Boutique property leasing and management across Melbourne\'s northern corridor.',
    images: ['/images/property-interior.jpg'],
  },
};

export default function RentPage() {
  const rentListings = MOCK_LISTINGS.filter(
    (listing) => listing.transactionType === 'rent'
  );

  return <RentClient initialListings={rentListings} />;
}
