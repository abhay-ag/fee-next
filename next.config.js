/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/all",
        destination: "http://18.181.215.18:8080/",
      },
      {
        source: "/student/add",
        destination: "http://18.181.215.18:8080/student/add",
      },
      {
        source: "/student/update",
        destination: "http://18.181.215.18:8080/student/update",
      },
      {
        source: "/student/delete",
        destination: "http://18.181.215.18:8080/student/delete",
      },
      {
        source: "/user/login",
        destination: "http://18.181.215.18:8080/login",
      },
      {
        source: "/student/get",
        destination: "http://18.181.215.18:8080/student/get",
      },
      {
        source: "/courses/add",
        destination: "http://18.181.215.18:8080/courses/add",
      },
      {
        source: "/courses",
        destination: "http://18.181.215.18:8080/courses",
      },
      {
        source: "/courses/get",
        destination: "http://18.181.215.18:8080/courses/get",
      },
      {
        source: "/courses/byid",
        destination: "http://18.181.215.18:8080/courses/get/by-id",
      },
      {
        source: "/attendance/save",
        destination: "http://18.181.215.18:8080/attendance/save",
      },
      {
        source: "/attendance/get",
        destination: "http://18.181.215.18:8080/attendance/get",
      },
      {
        source: "/notification",
        destination: "http://18.181.215.18:8080/notification",
      },
    ];
  },
};

module.exports = nextConfig;
