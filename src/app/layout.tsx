import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLdOrganization } from '@/components/seo/JsonLd';
import './globals.css';

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-display-loaded',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-body-loaded',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://krishrealestate.com.au'),
  title: {
    default: 'Krish Real Estate — Property, Handled Personally | Melbourne North',
    template: '%s | Krish Real Estate',
  },
  description:
    'Independent real estate agency serving Melbourne\'s northern suburbs. Residential sales, property management, and appraisals in Wollert, Epping, Craigieburn, and Donnybrook.',
  keywords: [
    'real estate Wollert',
    'real estate agent Melbourne north',
    'property for sale Wollert',
    'property management Epping',
    'houses for sale Craigieburn',
    'Krish Real Estate',
    'Chirag Yadav real estate',
  ],
  authors: [{ name: 'Krish Real Estate' }],
  creator: 'Krish Real Estate',
  publisher: 'Krish Real Estate',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://krishrealestate.com.au',
    siteName: 'Krish Real Estate',
    title: 'Krish Real Estate — Property, Handled Personally',
    description:
      'Independent real estate agency serving Melbourne\'s northern suburbs — Wollert, Epping, Craigieburn, Donnybrook.',
    images: [
      {
        url: '/images/hero-property.jpg',
        width: 1200,
        height: 630,
        alt: 'Modern home in Melbourne\'s northern suburbs — Krish Real Estate',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Krish Real Estate — Property, Handled Personally',
    description:
      'Independent real estate agency serving Melbourne\'s northern suburbs.',
    images: ['/images/hero-property.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'PLACEHOLDER — add verification code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-AU"
      className={`${cormorantGaramond.variable} ${dmSans.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#F4F1EA" />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <JsonLdOrganization />
      </body>
    </html>
  );
}
