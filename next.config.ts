import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['192.168.1.6'],
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.jaydenqin.com',
          },
        ],
        destination: 'https://jaydenqin.com/:path*',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
