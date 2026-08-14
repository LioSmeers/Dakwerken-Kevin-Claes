import { defineConfig } from "astro/config";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "Dakwerken-Kevin-Claes";
const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === "true";

export default defineConfig({
  site: process.env.SITE_URL ?? "https://liosmeers.github.io",
  base: process.env.BASE_PATH ?? (isGitHubPagesBuild ? `/${repositoryName}/` : "/"),
});
