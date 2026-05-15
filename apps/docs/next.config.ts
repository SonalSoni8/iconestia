import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  distDir: '.next-docs',
  transpilePackages: ['@thinicons/core', '@thinicons/react'],
};

export default nextConfig;
