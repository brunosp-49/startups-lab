import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/cases", destination: "/projetos", permanent: true },
      { source: "/inovacao", destination: "/ia-e-automacao", permanent: true },
      { source: "/ia", destination: "/ia-e-automacao", permanent: true },
      { source: "/startups", destination: "/mvp-para-startups", permanent: true },
      { source: "/desenvolvimento", destination: "/desenvolvimento-de-aplicativos", permanent: true },
    ];
  },
  images: {
    // Source photos are 1400px wide; larger variants only add optimizer load.
    deviceSizes: [640, 828, 1080, 1400, 1920],
    imageSizes: [64, 128, 256, 384],
  },
};

export default nextConfig;
