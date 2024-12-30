/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'images.unsplash.com'],
  },
  webpack: (config, { isServer }) => {
    // Add custom webpack config here if needed
    return config;
  },
  // Disable some features that might cause issues
  swcMinify: false,
  experimental: {
    // Disable experimental features
    esmExternals: false
  }
}

module.exports = nextConfig
