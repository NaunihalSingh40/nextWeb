/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // 👈 disables strict mode in development
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        pathname: '/img/**',
      },
    ],
  },
};

module.exports = nextConfig;
