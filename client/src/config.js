const config = {
  apiUrl:
    process.env.NODE_ENV === "production"
      ? "/api" // Vercel 部署时使用相对路径
      : "http://localhost:5000", // 本地开发时的地址
};

export default config;
