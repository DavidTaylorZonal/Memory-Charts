/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // This enables static HTML export
  basePath: "/Memory-Charts", // Your repo name
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
