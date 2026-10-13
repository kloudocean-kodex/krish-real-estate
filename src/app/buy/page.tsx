import type { Metadata } from 'next';
import {Suspense} from 'react';
import { LISTINGS } from '@/data/listings';
import { BuyClient } from './BuyClient';

export const metadata: Metadata = {
  alternates: {canonical: '/buy/'},
  title: 'Curated Properties for Sale | Melbourne North',
  description:
    'Explore our curated collection of architectural family residences, modern townhomes, and prestige properties for sale across Wollert, Epping, Craigieburn, and Donnybrook.',
  openGraph: {
    title: 'Curated Properties for Sale',
    description: 'Explore architectural residences for sale in Melbourne\'s northern corridor.',
    images: ['/images/hero-property.jpg'],
  },
};

export default function BuyPage() {
  const saleListings = LISTINGS.filter(
    (listing) => listing.transactionType === 'sale' && listing.status !== 'sold'
  );

  return <Suspense fallback={<div className="container" style={{paddingBlock:120}}>Loading properties…</div>}><BuyClient initialListings={saleListings} /></Suspense>;
}
