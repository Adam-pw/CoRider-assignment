/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipwaiting: true,
    disable: process.env.NEXT_PUBLIC_ENV === "development",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
      },
    ],
  },
});
