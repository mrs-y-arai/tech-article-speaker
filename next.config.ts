import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
    OPEN_AI_KEY: process.env.OPEN_AI_KEY,
    API_BASE_URL: process.env.API_BASE_URL,
  },
};

export default nextConfig;
