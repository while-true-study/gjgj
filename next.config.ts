import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
        permanent: true,
      },
    ];
  },
  reactStrictMode: false, // reactStrictMode는 nextConfig 내부로 이동
  webpack: (config) => {
    config.resolve.alias["@"] = path.join(__dirname, "app");
    config.resolve.alias["@redux"] = path.join(__dirname, "redux");
    return config;
  },
};

export default nextConfig;
