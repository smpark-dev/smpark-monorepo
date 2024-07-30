/** @type {import('next').NextConfig} */

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/interfaces/api/:path*',
      },
      {
        source: '/:path*',
        destination: '/ui/pages/:path*',
      },
    ];
  },
};

export default nextConfig;
