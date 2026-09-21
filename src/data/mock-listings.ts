/* ============================================================
   Mock Listing Fixtures — Deterministic test data
   These are PLACEHOLDER listings for development/demo purposes.
   All addresses, prices, and details are fictional.
   Will be replaced by Eagle CRM feed data in production.
   ============================================================ */

export interface NormalizedListing {
  listingId: string;
  status: 'active' | 'under-offer' | 'sold' | 'leased' | 'withdrawn';
  transactionType: 'sale' | 'rent';
  propertyType: string;
  address: {
    display: string;
    street: string;
    suburb: string;
    state: string;
    postcode: string;
  };
  price: {
    display: string;
    from?: number;
    to?: number;
  };
  beds: number;
  baths: number;
  cars: number;
  landSize?: number;
  buildingSize?: number;
  description: string;
  features: string[];
  media: {
    url: string;
    alt: string;
    type: 'image' | 'floorplan' | 'video';
  }[];
  inspections: {
    date: string;
    startTime: string;
    endTime: string;
  }[];
  agents: {
    name: string;
    phone: string;
    email: string;
    photo?: string;
  }[];
  slug: string;
  updatedAt: string;
}

export const MOCK_LISTINGS: NormalizedListing[] = [
  {
    listingId: 'demo-001',
    status: 'active',
    transactionType: 'sale',
    propertyType: 'House',
    address: {
      display: '15 Banksia Drive, Wollert VIC 3750',
      street: '15 Banksia Drive',
      suburb: 'Wollert',
      state: 'VIC',
      postcode: '3750',
    },
    price: { display: '$690,000 – $750,000', from: 690000, to: 750000 },
    beds: 4,
    baths: 2,
    cars: 2,
    landSize: 448,
    description: 'A beautifully presented four-bedroom family home in one of Wollert\'s most desirable estates. Featuring an open-plan living and dining area flooded with natural light, modern kitchen with stone benchtops and quality appliances, and a generous master suite with ensuite and walk-in robe. The low-maintenance rear garden is perfect for family living, while ducted heating and split-system cooling ensure year-round comfort.',
    features: ['Ducted Heating', 'Split System Cooling', 'Stone Benchtops', 'Walk-in Robe', 'Ensuite', 'Double Garage', 'Alarm System'],
    media: [
      { url: '/images/hero-property.jpg', alt: 'Front facade of 15 Banksia Drive, Wollert', type: 'image' },
      { url: '/images/property-interior.jpg', alt: 'Open-plan living and dining area', type: 'image' },
    ],
    inspections: [
      { date: '2026-09-27', startTime: '11:00', endTime: '11:30' },
      { date: '2026-09-28', startTime: '14:00', endTime: '14:30' },
    ],
    agents: [
      { name: 'Chirag Yadav', phone: '0400 000 000', email: 'chirag@krishrealestate.com.au', photo: '/images/agent-placeholder.jpg' },
    ],
    slug: '15-banksia-drive-wollert-3750',
    updatedAt: '2026-09-20T10:00:00Z',
  },
  {
    listingId: 'demo-002',
    status: 'active',
    transactionType: 'sale',
    propertyType: 'House',
    address: {
      display: '28 Eucalyptus Crescent, Wollert VIC 3750',
      street: '28 Eucalyptus Crescent',
      suburb: 'Wollert',
      state: 'VIC',
      postcode: '3750',
    },
    price: { display: '$720,000 – $780,000', from: 720000, to: 780000 },
    beds: 4,
    baths: 2,
    cars: 2,
    landSize: 512,
    description: 'Set on a generous 512sqm block, this impressive double-storey residence offers the space and style modern families desire. With four spacious bedrooms, multiple living zones, a stunning chef\'s kitchen, and a private backyard with room for a future pool, this home delivers exceptional value in a family-focused community.',
    features: ['Multiple Living Zones', 'Chef\'s Kitchen', 'Remote Garage', 'Landscaped Garden', 'Downlights', 'Ducted Heating', 'Evaporative Cooling'],
    media: [
      { url: '/images/hero-property.jpg', alt: 'Front facade of 28 Eucalyptus Crescent', type: 'image' },
      { url: '/images/property-interior.jpg', alt: 'Kitchen and living area', type: 'image' },
    ],
    inspections: [
      { date: '2026-09-27', startTime: '12:00', endTime: '12:30' },
    ],
    agents: [
      { name: 'Jagtar Singh', phone: '0400 000 001', email: 'jagtar@krishrealestate.com.au', photo: '/images/agent-placeholder.jpg' },
    ],
    slug: '28-eucalyptus-crescent-wollert-3750',
    updatedAt: '2026-09-19T14:00:00Z',
  },
  {
    listingId: 'demo-003',
    status: 'active',
    transactionType: 'sale',
    propertyType: 'Townhouse',
    address: {
      display: '3/12 Station Road, Epping VIC 3076',
      street: '3/12 Station Road',
      suburb: 'Epping',
      state: 'VIC',
      postcode: '3076',
    },
    price: { display: '$550,000 – $600,000', from: 550000, to: 600000 },
    beds: 3,
    baths: 2,
    cars: 1,
    landSize: 210,
    description: 'A modern three-bedroom townhouse in a prime Epping location, just moments from the train station and Pacific Epping. Featuring contemporary finishes throughout, an open-plan ground floor with seamless indoor-outdoor flow, and a sun-drenched courtyard perfect for entertaining.',
    features: ['Open Plan Living', 'Courtyard', 'Close to Station', 'Modern Finishes', 'Split System', 'European Laundry'],
    media: [
      { url: '/images/hero-property.jpg', alt: 'Townhouse at 3/12 Station Road, Epping', type: 'image' },
    ],
    inspections: [
      { date: '2026-09-28', startTime: '10:00', endTime: '10:30' },
    ],
    agents: [
      { name: 'Meenu Bhagtana', phone: '0400 000 002', email: 'meenu@krishrealestate.com.au', photo: '/images/agent-placeholder.jpg' },
    ],
    slug: '3-12-station-road-epping-3076',
    updatedAt: '2026-09-18T09:00:00Z',
  },
  {
    listingId: 'demo-004',
    status: 'active',
    transactionType: 'rent',
    propertyType: 'House',
    address: {
      display: '42 Grevillea Boulevard, Donnybrook VIC 3064',
      street: '42 Grevillea Boulevard',
      suburb: 'Donnybrook',
      state: 'VIC',
      postcode: '3064',
    },
    price: { display: '$480 per week' },
    beds: 4,
    baths: 2,
    cars: 2,
    landSize: 400,
    description: 'A near-new four-bedroom home available for lease in the heart of Donnybrook. Featuring a modern open-plan design, quality kitchen with dishwasher, ducted heating, and a secure double garage. Walking distance to local schools, parks, and the future town centre.',
    features: ['Near New', 'Ducted Heating', 'Dishwasher', 'Double Garage', 'Low Maintenance', 'Close to Schools'],
    media: [
      { url: '/images/hero-property.jpg', alt: '42 Grevillea Boulevard, Donnybrook', type: 'image' },
    ],
    inspections: [
      { date: '2026-09-26', startTime: '16:00', endTime: '16:15' },
    ],
    agents: [
      { name: 'Chirag Yadav', phone: '0400 000 000', email: 'chirag@krishrealestate.com.au', photo: '/images/agent-placeholder.jpg' },
    ],
    slug: '42-grevillea-boulevard-donnybrook-3064',
    updatedAt: '2026-09-17T11:00:00Z',
  },
  {
    listingId: 'demo-005',
    status: 'sold',
    transactionType: 'sale',
    propertyType: 'House',
    address: {
      display: '7 Wattle Lane, Wollert VIC 3750',
      street: '7 Wattle Lane',
      suburb: 'Wollert',
      state: 'VIC',
      postcode: '3750',
    },
    price: { display: 'Sold — $725,000', from: 725000 },
    beds: 4,
    baths: 2,
    cars: 2,
    landSize: 460,
    description: 'This four-bedroom family home in a quiet Wollert street was sold after a successful campaign. Featuring quality finishes, multiple living areas, and a spacious backyard.',
    features: ['Ducted Heating', 'Split System', 'Alfresco', 'Walk-in Robe'],
    media: [
      { url: '/images/hero-property.jpg', alt: '7 Wattle Lane, Wollert — Sold', type: 'image' },
    ],
    inspections: [],
    agents: [
      { name: 'Chirag Yadav', phone: '0400 000 000', email: 'chirag@krishrealestate.com.au' },
    ],
    slug: '7-wattle-lane-wollert-3750',
    updatedAt: '2026-09-10T10:00:00Z',
  },
  {
    listingId: 'demo-006',
    status: 'sold',
    transactionType: 'sale',
    propertyType: 'House',
    address: {
      display: '19 Correa Close, Craigieburn VIC 3064',
      street: '19 Correa Close',
      suburb: 'Craigieburn',
      state: 'VIC',
      postcode: '3064',
    },
    price: { display: 'Sold — $680,000', from: 680000 },
    beds: 3,
    baths: 2,
    cars: 2,
    landSize: 380,
    description: 'A well-maintained three-bedroom home in a sought-after Craigieburn pocket, sold under the Krish Real Estate banner.',
    features: ['Central Heating', 'Double Garage', 'Pergola', 'Updated Kitchen'],
    media: [
      { url: '/images/hero-property.jpg', alt: '19 Correa Close, Craigieburn — Sold', type: 'image' },
    ],
    inspections: [],
    agents: [
      { name: 'Jagtar Singh', phone: '0400 000 001', email: 'jagtar@krishrealestate.com.au' },
    ],
    slug: '19-correa-close-craigieburn-3064',
    updatedAt: '2026-08-28T10:00:00Z',
  },
];

/* Helper functions */
export function getActiveListings(type?: 'sale' | 'rent'): NormalizedListing[] {
  return MOCK_LISTINGS.filter(
    (l) => l.status === 'active' && (!type || l.transactionType === type)
  );
}

export function getSoldListings(): NormalizedListing[] {
  return MOCK_LISTINGS.filter((l) => l.status === 'sold' || l.status === 'leased');
}

export function getListingBySlug(slug: string): NormalizedListing | undefined {
  return MOCK_LISTINGS.find((l) => l.slug === slug);
}

export function getListingsBySuburb(suburb: string): NormalizedListing[] {
  return MOCK_LISTINGS.filter(
    (l) => l.address.suburb.toLowerCase() === suburb.toLowerCase()
  );
}
