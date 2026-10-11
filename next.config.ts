import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      { source: "/features", destination: "/#features", permanent: false },
      { source: "/insights", destination: "/#health-check", permanent: false },
      { source: "/about", destination: "/#about", permanent: false },
      { source: "/blog", destination: "/#features", permanent: false },
    ];
  },
  experimental: {
    agentFeedback: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
