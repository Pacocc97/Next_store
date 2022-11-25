/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, //esta llammando dos veces
  swcMinify: true,
  images: {
    domains: ['fakestoreapi.com', 'flowbite.com'],
  },
};

module.exports = nextConfig;
