/* Utility functions for Krish Real Estate */

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-AU', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(date);
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'pm' : 'am';
  const displayHours = hours % 12 || 12;
  return `${displayHours}${minutes > 0 ? `:${minutes.toString().padStart(2, '0')}` : ''}${period}`;
}

export function formatInspectionTime(inspection: { date: string; startTime: string; endTime: string }): string {
  return `${formatDate(inspection.date)}, ${formatTime(inspection.startTime)} – ${formatTime(inspection.endTime)}`;
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : (plural || `${singular}s`);
}

export function getPropertySummary(beds: number, baths: number, cars: number, landSize?: number): string {
  const parts = [
    `${beds} ${pluralize(beds, 'Bed')}`,
    `${baths} ${pluralize(baths, 'Bath')}`,
    `${cars} ${pluralize(cars, 'Car')}`,
  ];
  if (landSize) {
    parts.push(`${landSize}m²`);
  }
  return parts.join('  •  ');
}
