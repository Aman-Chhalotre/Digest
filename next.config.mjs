/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.startupdigest.in',
        port: '',
        pathname: '/uploads/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
