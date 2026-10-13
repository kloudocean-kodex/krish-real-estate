import type { NormalizedListing } from '@/data/listings';
import { Icon, type IconName } from '@/components/ui/Icon';
import styles from './PropertyFeatures.module.css';

type Facts = Pick<NormalizedListing, 'propertyType' | 'beds' | 'baths' | 'cars' | 'landSize' | 'buildingSize'>;
type Feature = { icon: IconName; value: number; label: string; spoken: string; area?: boolean };

export function PropertyFeatures({ listing, variant = 'compact', className = '' }: {
  listing: Facts;
  variant?: 'compact' | 'overlay' | 'detail';
  className?: string;
}) {
  const features: Feature[] = [];
  if (!listing.propertyType.toLowerCase().includes('land')) {
    features.push(
      { icon: 'bed', value: listing.beds, label: listing.beds === 1 ? 'Bedroom' : 'Bedrooms', spoken: `${listing.beds} ${listing.beds === 1 ? 'bedroom' : 'bedrooms'}` },
      { icon: 'bath', value: listing.baths, label: listing.baths === 1 ? 'Bathroom' : 'Bathrooms', spoken: `${listing.baths} ${listing.baths === 1 ? 'bathroom' : 'bathrooms'}` },
      { icon: 'car', value: listing.cars, label: listing.cars === 1 ? 'Car space' : 'Car spaces', spoken: `${listing.cars} ${listing.cars === 1 ? 'car space' : 'car spaces'}` },
    );
  }
  if (listing.landSize && listing.landSize > 0) features.push({
    icon: 'land', value: listing.landSize, label: 'Land area', spoken: `${listing.landSize} square metres land area`, area: true,
  });
  if (variant === 'detail' && listing.buildingSize && listing.buildingSize > 0) features.push({
    icon: 'floor', value: listing.buildingSize, label: 'Floor area', spoken: `${listing.buildingSize} square metres floor area`, area: true,
  });
  if (!features.length) return null;

  return <ul className={`${styles.features} ${styles[variant]} ${className}`} role="list"
    aria-label={`Property features: ${features.map(feature => feature.spoken).join(', ')}`}>
    {features.map(feature => <li className={styles.item} key={feature.icon}>
      <Icon name={feature.icon} className={styles.icon} />
      <span className={styles.value} aria-hidden="true">{feature.value.toLocaleString('en-AU')}
        {feature.area && <span className={styles.unit}>m²</span>}</span>
      {variant === 'detail' && <span className={styles.label} aria-hidden="true">{feature.label}</span>}
      <span className="sr-only">{feature.spoken}</span>
    </li>)}
  </ul>;
}
