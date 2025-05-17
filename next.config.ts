import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "/**", // Allow all paths
      },
      {
        protocol: "https",
        hostname: "lottie.host",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
