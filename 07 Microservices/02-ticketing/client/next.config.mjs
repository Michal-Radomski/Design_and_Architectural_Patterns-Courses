/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: {
    watchOptions: { poll: 300 },
  },
};

export default nextConfig;
