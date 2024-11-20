import Router from "@koa/router";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";
import errorHandler from "./middleware/errorHandler.js";
import tasksRouter from "./routes/tasks.js";

const app = new Koa();
const router = new Router();

// 错误处理中间件
app.use(errorHandler());

// 跨域设置
app.use(
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);

app.use(bodyParser());

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

export default app;
