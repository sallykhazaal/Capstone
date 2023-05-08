/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "www.aibinternational.com",
      "organicconsumers.org",
      "myplate-prod.azureedge.us",
      "www.biologyonline.com",
    ],
  },
};

module.exports = nextConfig;
