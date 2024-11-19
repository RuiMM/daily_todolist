# 构建阶段
FROM node:18-alpine AS builder

WORKDIR /app

# 安装pnpm
RUN npm install -g pnpm

# 复制package.json和pnpm-lock.yaml
COPY package.json pnpm-workspace.yaml ./
COPY server/package.json server/
COPY client/package.json client/

# 安装依赖
RUN pnpm install

# 复制源代码
COPY . .

# 构建前端
RUN cd client && pnpm build

# 生产阶段
FROM node:18-alpine

WORKDIR /app

# 从构建阶段复制文件
COPY --from=builder /app/server/package.json ./
COPY --from=builder /app/server/src ./src
COPY --from=builder /app/client/dist ./public

# 安装生产依赖
RUN npm install -g pnpm && pnpm install --prod

EXPOSE 3001

CMD ["pnpm", "start"]