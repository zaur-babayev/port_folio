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
  // Disable some features that might cause issues
  swcMinify: false,
  experimental: {
    // Disable experimental features
    esmExternals: false
  },
  // Required for Cloudflare Pages
  output: 'standalone',
}

module.exports = nextConfig
