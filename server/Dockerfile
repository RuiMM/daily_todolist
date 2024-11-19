# 构建阶段
FROM node:18-alpine AS builder

WORKDIR /app

# 安装pnpm
RUN npm install -g pnpm

# 复制package.json文件
COPY server/package.json server/
COPY server/pnpm-lock.yaml server/

# 安装依赖
WORKDIR /app/server
RUN pnpm install

# 复制源代码
COPY server/ ./

# 生产阶段
FROM node:18-alpine

WORKDIR /app

# 从构建阶段复制文件
COPY --from=builder /app/server/package.json ./
COPY --from=builder /app/server/node_modules ./node_modules
COPY --from=builder /app/server/src ./src

# 创建public目录
RUN mkdir -p public

EXPOSE 3001

CMD ["npm", "start"]