/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/bgauto',
  assetPrefix: '/bgauto',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

export default nextConfig
