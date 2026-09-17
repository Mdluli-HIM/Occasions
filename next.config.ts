import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    // Parent folder also has a lockfile; pin Turbopack to this app.
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
