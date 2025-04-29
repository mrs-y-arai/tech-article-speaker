import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
  },
};

export default nextConfig;
