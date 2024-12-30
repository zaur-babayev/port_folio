/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'images.unsplash.com'],
    unoptimized: true, // Required for Cloudflare Pages
  },
  webpack: (config, { isServer }) => {
    return config;
  },
  swcMinify: true, // Enable SWC minification for better performance
}

module.exports = nextConfig
