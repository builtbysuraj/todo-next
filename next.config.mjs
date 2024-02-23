/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false,
  compiler: {
    // removeConsole: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

export default nextConfig
