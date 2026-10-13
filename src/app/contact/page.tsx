import type { Metadata } from 'next';
import { ContactClient } from './ContactClient';

export const metadata: Metadata = {
  alternates: {canonical: '/contact/'},
  title: 'Contact Our Wollert Team',
  description:
    'Connect with the leadership team at Krish Real Estate. Office located at 22 Wollemi Avenue, Wollert VIC 3750. Confidential consultations for buyers, vendors, and property investors.',
  openGraph: {
    title: 'Contact Krish Real Estate | Melbourne North Private Concierge',
    description: 'Boutique real estate advisory in Wollert, Epping, Craigieburn & Donnybrook.',
    images: ['/images/hero-property.jpg'],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
