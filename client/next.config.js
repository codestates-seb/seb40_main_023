/**
 * @type {import('next').NextConfig}
 */
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const nextConfig = {
  images: {
    domains: ["saypart.s3.ap-northeast-2.amazonaws.com"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "saypart.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/next-s3-uploads/**",
      },
    ],
  },
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
      {
        source: "/lucky/:path*",
        has: [
          {
            type: "host",
            value: "https://seb40-main-023.vercel.app",
          },
        ],
        destination: "/lucky/:path*",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
