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
        source: "/student/update",
        destination: "http://localhost:8080/student/update",
      },
      {
        source: "/student/delete",
        destination: "http://localhost:8080/student/delete",
      },
      {
        source: "/user/login",
        destination: "http://localhost:8080/login",
      },
      {
        source: "/student/get",
        destination: "http://localhost:8080/student/get",
      },
      {
        source: "/courses/add",
        destination: "http://localhost:8080/courses/add",
      },
      {
        source: "/courses",
        destination: "http://localhost:8080/courses",
      },
    ];
  },
};

module.exports = nextConfig;
