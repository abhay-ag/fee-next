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
      {
        source: "/student/add",
        destination: "http://localhost:8080/student/add",
      },
      {
        source: "/student/delete",
        destination: "http://localhost:8080/student/delete",
      },
      {
        source: "/user/login",
        destination: "http://localhost:8080/login",
      },
    ];
  },
};

module.exports = nextConfig;
