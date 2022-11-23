/**
 * @type {import('next').NextConfig}
 */
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    console.log(BASE_URL);
    return [
      {
        source: "/api/:slug*",
        destination: `${BASE_URL}/:slug*`,
      },
    ];
  },
};

module.exports = nextConfig;
