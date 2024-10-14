/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['next-auth'],
  images: {
    domains: ['s.gravatar.com', 'cdn.auth0.com'],
  },
};

export default nextConfig;