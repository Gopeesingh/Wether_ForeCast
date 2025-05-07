import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Optional: Ignores ESLint errors during the build process
  },
  typescript: {
    ignoreBuildErrors: true, // Optional: Ignores TypeScript errors during the build process
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "openweathermap.org", // Ensures images from openweathermap.org are allowed
      },
    ],
  },
};

export default nextConfig;

