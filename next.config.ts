import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['@tanstack/react-table', 'lodash-es'],
  },
  // New location for server external packages
  serverExternalPackages: ['llamaindex'],
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Content-Security-Policy', value: 'default-src \'self\'' },
      ],
    },
  ],
};

//export default nextConfig;

// Wrap the config with the analyzer conditionally
export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);
