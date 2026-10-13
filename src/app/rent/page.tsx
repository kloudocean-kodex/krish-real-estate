import type { Metadata } from 'next';
import {Suspense} from 'react';
import { LISTINGS } from '@/data/listings';
import { RentClient } from './RentClient';

export const metadata: Metadata = {
  alternates: {canonical: '/rent/'},
  title: 'Executive Residences for Lease | Melbourne North',
  description:
    'Browse our curated collection of executive family homes and modern residences for lease across Wollert, Epping, Craigieburn, and Donnybrook.',
  openGraph: {
    title: 'Executive Residences for Lease',
    description: 'Boutique property leasing and management across Melbourne\'s northern corridor.',
    images: ['/images/property-interior.jpg'],
  },
};

export default function RentPage() {
  const rentListings = LISTINGS.filter(
    (listing) => listing.transactionType === 'rent' && ['active','under-offer'].includes(listing.status)
  );

  return <Suspense fallback={<div className="container" style={{paddingBlock:120}}>Loading properties…</div>}><RentClient initialListings={rentListings} /></Suspense>;
}
