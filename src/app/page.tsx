import type { Metadata } from 'next';
import { HomeClient } from '@/components/home/HomeClient';
import { JsonLdWebSite } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Krish Real Estate — Property, Handled Personally | Melbourne North',
  description:
    'Independent real estate agency serving Wollert, Epping, Craigieburn & Donnybrook. Residential sales, property management, and honest appraisals across Melbourne\'s northern suburbs.',
};

export default function HomePage() {
  return (
    <>
      <JsonLdWebSite />
      <HomeClient />
    </>
  );
}
