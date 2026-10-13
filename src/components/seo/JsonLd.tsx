import { BUSINESS, TEAM } from '@/data/team';

export function JsonLdOrganization() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    taxID: BUSINESS.abn,
    logo: `${BUSINESS.website}/images/krish-logo-stacked.png`,
    description: BUSINESS.description,
    slogan: BUSINESS.tagline,
    url: BUSINESS.website,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.suburb,
      addressRegion: BUSINESS.address.state,
      postalCode: BUSINESS.address.postcode,
      addressCountry: BUSINESS.address.country,
    },
    areaServed: [
      { '@type': 'City', name: 'Wollert' },
      { '@type': 'City', name: 'Epping' },
      { '@type': 'City', name: 'Craigieburn' },
      { '@type': 'City', name: 'Donnybrook' },
    ],
    sameAs: Object.values(BUSINESS.socialMedia),
    founder: {
      '@type': 'Person',
      name: BUSINESS.director,
      jobTitle: 'Director & Licensed Estate Agent',
    },
    employee: TEAM.map((member) => ({
      '@type': 'Person',
      name: member.name,
      jobTitle: member.role,
    })),
    memberOf: BUSINESS.memberships.map((m) => ({
      '@type': 'Organization',
      name: m,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function JsonLdBreadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BUSINESS.website}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function JsonLdWebSite() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BUSINESS.name,
    url: BUSINESS.website,

  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
