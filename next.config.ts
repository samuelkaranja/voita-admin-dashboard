import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "res.cloudinary.com" }, // for real provider photos later
    ],
  },
};

export default nextConfig;
