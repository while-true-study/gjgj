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
  images: {
    unoptimized: true, // ✅ 이미지 최적화 비활성화
  },
};

export default nextConfig;
