import Koa from "koa";
import bodyParser from "koa-bodyparser";
import send from "koa-send";
import serve from "koa-static";
import cors from "koa2-cors";
import path from "path";
import { fileURLToPath } from "url";
import errorHandler from "./middleware/errorHandler.js";
import tasksRouter from "./routes/tasks.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = new Koa();

// 错误处理中间件
app.use(errorHandler());

// 跨域设置
app.use(
  cors({
    origin: ["https://ruimm.github.io", "http://localhost:3000"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: true,
  })
);

app.use(bodyParser());

// API路由
app.use(tasksRouter.routes());
app.use(tasksRouter.allowedMethods());

// 静态文件服务
const publicPath = path.join(__dirname, "../public");
app.use(serve(publicPath));

// 处理前端路由 - 所有非API请求返回index.html
app.use(async (ctx) => {
  if (ctx.path === "/api/health") {
    ctx.status = 200;
    ctx.body = { status: "ok" };
    return;
  }

  // 保持原有的静态文件处理逻辑
  if (ctx.path.startsWith("/api")) {
    return;
  }

  try {
    await send(ctx, "index.html", { root: publicPath });
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = "服务器错误";
  }
});

export default app;
