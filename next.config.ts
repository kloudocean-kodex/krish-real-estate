import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    qualities: [75, 85, 90],
    formats: ['image/avif', 'image/webp'],
  },
  trailingSlash: true,
};

export default nextConfig;
