import snapshot from './listings.json';
export interface NormalizedListing {
  statementOfInformation?: string;
  tours?: string[];
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


export const LISTINGS = snapshot.listings as NormalizedListing[];
export const LISTINGS_SYNCED_AT = snapshot.syncedAt;
export function getActiveListings(type?:'sale'|'rent'){return LISTINGS.filter(l=>['active','under-offer'].includes(l.status)&&(!type||l.transactionType===type));}
export function getSoldListings(){return LISTINGS.filter(l=>['sold','leased'].includes(l.status));}
export function getListingBySlug(slug:string){return LISTINGS.find(l=>l.slug===slug);}
export function getListingsBySuburb(suburb:string){return LISTINGS.filter(l=>l.address.suburb.toLowerCase()===suburb.toLowerCase());}
