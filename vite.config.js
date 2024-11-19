import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// 获取仓库名称，用于GitHub Pages部署
const getBase = () => {
  if (process.env.GITHUB_REPOSITORY) {
    const [username, repo] = process.env.GITHUB_REPOSITORY.split("/");
    return `/${repo}/`;
  }
  return "/";
};

export default defineConfig({
  plugins: [react()],
  base: getBase(),
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
    host: true,
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: true,
  },
});
