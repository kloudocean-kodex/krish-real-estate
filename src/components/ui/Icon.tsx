import type { ReactNode } from 'react';

// Original 24-unit line drawings, with one consistent stroke and optical scale.
const drawings = {
  bed: <><path d="M3 19v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7M3 16h18M5 10V6a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v4" /><path d="M7 10V8h4v2m2 0V8h4v2" /></>,
  bath: <><path d="M3 12h18M5 12v3a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4v-3M7 19v2m10-2v2M6 12V5a2 2 0 0 1 4 0v1M9 6h3" /></>,
  car: <><path d="m5 10 1.5-5h11l1.5 5M3 17v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5H3ZM5 17v2m14-2v2M7 13h1m8 0h1" /></>,
  land: <><path d="M5 9V5h4m6 0h4v4m0 6v4h-4m-6 0H5v-4M8 16l8-8M12 8h4v4M8 12v4h4" /></>,
  floor: <><path d="M4 4h16v16H4zM4 11h7V4m0 7h9m-7 0v9M4 16h9" /></>,
  calendar: <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M8 3v4m8-4v4M4 10h16M8 14h2m4 0h2m-8 3h2" /></>,
  phone: <path d="m7 3 3 5-2.5 2.5a15 15 0 0 0 6 6L16 14l5 3v2a2 2 0 0 1-2.2 2A19 19 0 0 1 3 5.2 2 2 0 0 1 5 3h2Z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof drawings;

/** Decorative when paired with visible or screen-reader text. */
export function Icon({ name, size = 20, className }: { name: IconName; size?: number; className?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    focusable="false" className={className}>{drawings[name]}</svg>;
}
