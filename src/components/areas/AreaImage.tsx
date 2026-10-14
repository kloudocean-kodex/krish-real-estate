import Image from 'next/image';
import type { Area } from '@/data/areas';

/** One artwork source shared by homepage, area index and suburb guide. */
export function AreaImage({ area, sizes, className, eager = false }: {
  area: Pick<Area, 'slug' | 'name' | 'image'>;
  sizes: string;
  className?: string;
  eager?: boolean;
}) {
  const sources = (format: string) => [480, 720, 1200]
    .map(width => `/images/areas/${area.slug}-${width}.${format} ${width}w`).join(', ');
  return <picture>
    <source type="image/avif" srcSet={sources('avif')} sizes={sizes} />
    <source type="image/webp" srcSet={sources('webp')} sizes={sizes} />
    <Image src={area.image} alt={`Illustrative neighbourhood artwork for the ${area.name} suburb guide`}
      fill sizes={sizes} className={className} loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'} />
  </picture>;
}
