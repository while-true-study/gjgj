import type { NextConfig } from "next";
module.exports = {
  async redirects() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
        permanent: true,
      },
    ];
  },
  reactStrictMode: false, // false로 변경
};
const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
