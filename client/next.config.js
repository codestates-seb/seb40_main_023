/**
 * @type {import('next').NextConfig}
 */
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const nextConfig = {
  reactStrictMode: false,

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${BASE_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
