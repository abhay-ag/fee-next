/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/all",
        destination: "http://localhost:8080/",
      },
    ];
  },
};

module.exports = nextConfig;
