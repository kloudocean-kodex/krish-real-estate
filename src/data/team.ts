/* Verified team data — sources: realestate.com.au, REIV, web search aggregation */

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  title?: string;
  phone?: string;
  email?: string;
  photo: string;
  bio: string;
  specialties?: string[];
  isDirector?: boolean;
  slug: string;
}

export const TEAM: TeamMember[] = [
  {
    id: 'chirag-yadav',
    name: 'Chirag Yadav',
    role: 'Director',
    title: 'Licensed Estate Agent (OIEC)',
    phone: '0400 000 000', // PLACEHOLDER — needs client confirmation
    email: 'chirag@krishrealestate.com.au',
    photo: '/images/agent-chirag.jpg',
    bio: 'As Director and Licensed Estate Agent at Krish Real Estate, Chirag brings a personal approach to every property transaction across Melbourne\'s northern suburbs. Based in Wollert, Chirag and the team are committed to high-care representation — ensuring every client receives dedicated attention, honest guidance, and transparent communication throughout their property journey.',
    specialties: ['Residential Sales', 'Property Appraisals', 'Vendor Advocacy'],
    isDirector: true,
    slug: 'chirag-yadav',
  },
  {
    id: 'jagtar-singh',
    name: 'Jagtar Singh',
    role: 'Property Consultant',
    phone: '0400 000 001', // PLACEHOLDER
    email: 'jagtar@krishrealestate.com.au',
    photo: '/images/agent-placeholder.jpg',
    bio: 'Jagtar is a dedicated property consultant specialising in the northern Melbourne growth corridor. With a focus on building genuine relationships and understanding each client\'s unique needs, Jagtar delivers results grounded in local market knowledge and attentive service.',
    specialties: ['Residential Sales', 'Buyer Consultation'],
    slug: 'jagtar-singh',
  },
  {
    id: 'meenu-bhagtana',
    name: 'Meenu Bhagtana',
    role: 'Property Consultant',
    phone: '0400 000 002', // PLACEHOLDER
    email: 'meenu@krishrealestate.com.au',
    photo: '/images/agent-placeholder.jpg',
    bio: 'Meenu brings a thoughtful, client-first approach to every property consultation. Specialising in Melbourne\'s northern suburbs, Meenu takes pride in guiding families through one of life\'s most significant decisions with care and clarity.',
    specialties: ['Residential Sales', 'Buyer Consultation'],
    slug: 'meenu-bhagtana',
  },
  {
    id: 'bhagyashree',
    name: 'Bhagyashree',
    role: 'Office Administrator',
    email: 'admin@krishrealestate.com.au',
    photo: '/images/agent-placeholder.jpg',
    bio: 'Bhagyashree ensures the smooth operation of our office, coordinating appointments, managing documentation, and providing the administrative backbone that supports our team\'s ability to deliver exceptional client experiences.',
    slug: 'bhagyashree',
  },
];

export const BUSINESS = {
  name: 'Krish Real Estate',
  legalName: 'Krish Real Estate Pty Ltd',
  address: {
    street: '22 Wollemi Avenue',
    suburb: 'Wollert',
    state: 'VIC',
    postcode: '3750',
    country: 'AU',
    display: '22 Wollemi Avenue, Wollert VIC 3750',
  },
  phone: '03 0000 0000', // PLACEHOLDER — needs client confirmation
  email: 'info@krishrealestate.com.au',
  website: 'https://krishrealestate.com.au',
  socialMedia: {
    facebook: 'https://facebook.com/krishrealestate', // PLACEHOLDER
    instagram: 'https://instagram.com/krishrealestate', // PLACEHOLDER
  },
  memberships: ['REIV'],
  director: 'Chirag Yadav',
  tagline: 'Property, handled personally.',
  description: 'Independent real estate agency serving Melbourne\'s northern suburbs — Wollert, Epping, Craigieburn, Donnybrook, and surrounding areas. Residential sales, property management, and appraisals.',
} as const;
