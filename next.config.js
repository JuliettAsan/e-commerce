/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "main/styles")],
    prependData: `@import "_main.scss";`,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    domains: [
      "imgix.cosmicjs.com",
      "lh3.googleusercontent.com",
      "cdn.sanity.io",
    ],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
