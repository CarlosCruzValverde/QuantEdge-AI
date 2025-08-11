import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // 1. Backend Proxy Configuration
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.BACKEND_URL || "http://localhost:8000"
          }/api/:path*`,
      },
    ];
  },

  // 2. Bundle Optimization
  experimental: {
    optimizePackageImports: ["@tanstack/react-table", "lodash-es"],
  },

  // 3. AI Package Support
  serverExternalPackages: ["llamaindex"],

  // 4. Security Headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self'",
              `connect-src 'self' ${process.env.BACKEND_URL || "http://localhost:8000"}`,
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data:",
              "font-src 'self'",
              "frame-src 'none'",
              "object-src 'none'"
            ].join('; ')
          },
        ],
      },
    ];
  },
};

// 5. Bundle Analyzer (Conditional)
export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);