/**
 * @type {import('next').NextConfig}
 */
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const withInterceptStdout = require("next-intercept-stdout");

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
  async redirects() {
    return [
      {
        source: "/create/complete",
        destination: "/",
        permanent: true,
      },
      {
        source: "/edit/complete",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
