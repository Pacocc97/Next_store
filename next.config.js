/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, //esta llammando dos veces 
  swcMinify: true,
  images: {
    domains: ['fakestoreapi.com'],
  },
};

module.exports = nextConfig;
