import type { Metadata } from 'next';
import { AppraisalForm } from './AppraisalForm';

export const metadata: Metadata = {
  alternates: {canonical: '/sell/property-appraisal/'},
  title: 'Request a Confidential Property Appraisal',
  description:
    'Discover the true market value of your property in Wollert, Epping, Craigieburn, or Donnybrook. Evidence-based appraisal with complete vendor discretion.',
  openGraph: {
    title: 'Confidential Property Appraisal',
    description: 'Evidence-based property appraisal across Melbourne\'s northern corridor.',
    images: ['/images/property-interior.jpg'],
  },
};

export default function AppraisalPage() {
  return <AppraisalForm />;
}
