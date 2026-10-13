import { SUMMARY_LISTINGS } from './listing-summaries';
const localPhoto=(suburb:string)=>SUMMARY_LISTINGS.find(l=>l.address.suburb.toLowerCase()===suburb&&l.media[0])?.media[0].url || '/images/krish-logo-stacked.png';
/* Area/suburb data — verified secondary sources */

export interface Area {
  slug: string;
  name: string;
  postcode: string;
  description: string;
  medianPrice?: string;
  priceNote?: string;
  population?: string;
  character: string;
  keyFeatures: string[];
  image: string;
}

export const AREAS: Area[] = [
  {
    slug: 'wollert',
    name: 'Wollert',
    postcode: '3750',
    description: 'A thriving growth corridor suburb in Melbourne’s north, Wollert has rapidly evolved into one of the most sought-after family suburbs in the north. With new schools, parks, and infrastructure continually being developed, Wollert offers modern living with room to grow.',
    character: 'Young families, new estates, growth corridor',
    keyFeatures: [
      'Family-oriented community and new residential estates',
      'Modern schools: Wollert Primary, Edgars Creek, Wollert Secondary College',
      'Close to Epping and Craigieburn train stations',
      'Growing retail and community infrastructure',
      'New parks, playgrounds, and walking trails',
    ],
    image: localPhoto('wollert'),
  },
  {
    slug: 'epping',
    name: 'Epping',
    postcode: '3076',
    description: 'One of Melbourne\'s most established northern suburbs, Epping combines suburban convenience with excellent transport links. Home to the Northern Hospital and Pacific Epping shopping centre, it\'s a hub for the northern corridor.',
    character: 'Established, well-connected, diverse community',
    keyFeatures: [
      'Direct train line to Melbourne CBD',
      'Pacific Epping and Epping Plaza shopping',
      'Northern Hospital precinct',
      'Established schools and community facilities',
      'Strong rental demand',
    ],
    image: localPhoto('epping'),
  },
  {
    slug: 'craigieburn',
    name: 'Craigieburn',
    postcode: '3064',
    description: 'A major northern suburb with excellent transport, shopping, and community facilities. Craigieburn\'s mix of established neighbourhoods and new estates offers something for every stage of life.',
    character: 'Large suburban hub, family-friendly, well-serviced',
    keyFeatures: [
      'Direct train line to Melbourne CBD',
      'Craigieburn Central shopping',
      'Diverse housing stock from established to new',
      'Strong school network',
      'Easy access to Hume Freeway',
    ],
    image: localPhoto('craigieburn'),
  },
  {
    slug: 'donnybrook',
    name: 'Donnybrook',
    postcode: '3064',
    description: 'An emerging suburb adjacent to Wollert, Donnybrook is part of Melbourne\'s northern growth frontier. With new estates, a planned town centre, and rail connections, Donnybrook represents opportunity.',
    character: 'Emerging growth area, new estates, future potential',
    keyFeatures: [
      'Rapidly growing with new estate developments',
      'Donnybrook station on the Seymour line',
      'Close to Hume Freeway for city access',
      'New schools and community facilities',
      'Affordable entry point for northern Melbourne',
    ],
    image: localPhoto('donnybrook'),
  },
];
