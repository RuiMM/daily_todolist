import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";
import errorHandler from "./middleware/errorHandler.js";
import tasksRouter from "./routes/tasks.js";

const app = new Koa();

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

// 路由
app.use(tasksRouter.routes());
app.use(tasksRouter.allowedMethods());

// 健康检查端点 (Koa 方式)
app.use(async (ctx, next) => {
  if (ctx.path === "/api/health") {
    ctx.body = { status: "ok" };
    ctx.status = 200;
  } else {
    await next();
  }
});

export default app;
