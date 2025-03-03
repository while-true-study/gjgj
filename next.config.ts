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
  reactStrictMode: false,
  webpack: (config) => {
    config.resolve.alias["@"] = path.join(__dirname, "app");
    config.resolve.alias["@redux"] = path.join(__dirname, "redux");
    return config;
  },
  output: "export",
};

export default nextConfig;
