FROM node:18-alpine as builder

WORKDIR /app

# 复制工作区配置
COPY package.json pnpm-workspace.yaml ./
COPY client/package.json client/
COPY server/package.json server/

# 安装pnpm
RUN npm install -g pnpm

# 安装依赖
RUN pnpm install

# 复制源代码
COPY . .

# 构建前端
RUN cd client && pnpm build

# 构建后端镜像
FROM node:18-alpine

WORKDIR /app

# 复制后端文件
COPY --from=builder /app/server/package.json ./
COPY --from=builder /app/server/src ./src
COPY --from=builder /app/client/dist ./public

# 安装生产依赖
RUN npm install -g pnpm && pnpm install --prod

EXPOSE 3001

CMD ["pnpm", "start"]