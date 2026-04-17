import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //https://ecommerce.routemisr.com/Route-Academy-products/1680403397402-cover.jpeg
  reactCompiler: true,
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname : 'ecommerce.routemisr.com',
      pathname : '/**'

    }]
  }
};

export default nextConfig;
