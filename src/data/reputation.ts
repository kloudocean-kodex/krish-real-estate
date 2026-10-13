import { BUSINESS } from './team';

// Curated source snapshots, deliberately kept separate and never added together.
export const REPUTATION = {
  google: {
    rating: '4.9',
    count: 176,
    checked: '14 October 2026',
    url: BUSINESS.socialMedia.googleBusiness,
  },
  chirag: {
    rating: '5.0',
    count: 152,
    checked: '13 October 2026',
    url: BUSINESS.socialMedia.realestateAgent,
  },
} as const;

export const REVIEW_EXCERPTS = [
  {
    text: 'He is a very good agent, friendly, helpful and always cooperative.',
    author: 'Daniyal Nadeem',
    context: 'Rental experience',
    source: 'Google',
    url: REPUTATION.google.url,
  },
  {
    text: 'Chirag was prompt, transparent and professional',
    author: 'Seller of a house',
    context: 'Craigieburn, VIC',
    source: 'realestate.com.au',
    url: REPUTATION.chirag.url,
  },
  {
    text: 'Chirag was outstanding throughout the entire process.',
    author: 'Seller of residential land',
    context: 'Wallan, VIC',
    source: 'realestate.com.au',
    url: REPUTATION.chirag.url,
  },
] as const;
