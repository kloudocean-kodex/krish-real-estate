import type { Metadata } from 'next';
import { AppraisalForm } from './AppraisalForm';

export const metadata: Metadata = {
  title: 'Request a Confidential Property Appraisal | Krish Real Estate',
  description:
    'Discover the true market value of your property in Wollert, Epping, Craigieburn, or Donnybrook. Evidence-based valuation with complete vendor discretion.',
  openGraph: {
    title: 'Confidential Property Appraisal | Krish Real Estate',
    description: 'Evidence-based property valuation across Melbourne\'s northern corridor.',
    images: ['/images/property-interior.jpg'],
  },
};

export default function AppraisalPage() {
  return <AppraisalForm />;
}
