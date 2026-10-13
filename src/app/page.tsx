import type { Metadata } from 'next';
import { HomeClient } from '@/components/home/HomeClient';
import { JsonLdWebSite } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  alternates: {canonical: '/'},
  title: {absolute: 'Krish Real Estate | Wollert & Melbourne North'},
  description:
    'Working together means winning together. Personal real estate service in Wollert, Epping, Craigieburn and Donnybrook: sales, property management and appraisals.',
};

export default function HomePage() {
  return (
    <>
      <JsonLdWebSite />
      <HomeClient />
    </>
  );
}
