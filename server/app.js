import Router from "@koa/router";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import serve from "koa-static";
import cors from "koa2-cors";
import path from "path";
import { fileURLToPath } from "url";
import errorHandler from "./middleware/errorHandler.js";
import tasksRouter from "./routes/tasks.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = new Koa();
const router = new Router();

// 错误处理中间件
app.use(errorHandler());

// 跨域设置
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://daily-todolist.vercel.app" // 注意：移除了末尾的斜杠
        : "http://localhost:3001",
    credentials: true,
  })
);

app.use(bodyParser());

// Serve static files
app.use(serve(path.join(__dirname, "../client/dist")));

// 健康检查路由
router.get("/api/health", (ctx) => {
  ctx.status = 200;
  ctx.body = {
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };
});

// 注册所有路由
app.use(router.routes());
app.use(router.allowedMethods());
app.use(tasksRouter.routes());
app.use(tasksRouter.allowedMethods());

const PORT = process.env.PORT || 3001;

app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

// 只在直接运行时启动服务器
app.listen(PORT, () => {
  console.log(`✨ Server running on http://localhost:${PORT}`);
});
