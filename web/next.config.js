/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Matches all domains
      },
      {
        protocol: 'http',
        hostname: '**', // Matches all domains (if HTTP is also needed)
      },
    ],
  },
};

module.exports = nextConfig;
