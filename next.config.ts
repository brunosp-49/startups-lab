import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Source photos are 1400px wide; larger variants only add optimizer load.
    deviceSizes: [640, 828, 1080, 1400, 1920],
    imageSizes: [64, 128, 256, 384],
  },
};

export default nextConfig;
