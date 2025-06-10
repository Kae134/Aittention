import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost', 'avatar.vercel.sh'],
  },
  experimental: {
    authInterrupts: true,
  },
};

export default nextConfig;
