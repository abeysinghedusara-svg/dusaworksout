import type { NextConfig } from "next";
const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  webpack(config, { dev }) {
    // Polling avoids native file-watcher limits in restricted desktop environments.
    if (dev)
      config.watchOptions = {
        ...config.watchOptions,
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ["**/node_modules/**", "**/.git/**"],
      };
    return config;
  },
};
export default config;
