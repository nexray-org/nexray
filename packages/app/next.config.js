/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true
  },
  // https://nextjs.org/docs/advanced-features/output-file-tracing
  output: "standalone",
};

module.exports = nextConfig;
