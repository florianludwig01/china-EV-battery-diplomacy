import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repositoryName =
  process.env.GITHUB_REPOSITORY?.split("/")[1] ??
  "china-battery-diplomacy";
const isUserOrOrganizationPage = repositoryName.endsWith(".github.io");
const basePath =
  isGitHubPages && !isUserOrOrganizationPage
    ? `/${repositoryName}`
    : "";

const nextConfig: NextConfig = {
  ...(isGitHubPages ? { output: "export" as const } : {}),
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: isGitHubPages,
  images: {
    unoptimized: isGitHubPages,
  },
  experimental: {
    agentFeedback: true,
  },
  ...(!isGitHubPages
    ? {
        cacheComponents: true,
        partialPrefetching: true,
      }
    : {}),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
