# 阶段1: 构建前端
FROM node:20 AS frontend-builder

WORKDIR /app/frontend

# 复制前端依赖文件并安装
COPY frontend/package.json frontend/pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

# 复制前端源代码并构建
COPY frontend/ .
RUN pnpm run build

# 阶段2: 构建后端
FROM node:20 AS backend-builder

WORKDIR /app/backend

# 复制后端依赖文件并安装
COPY backend/package.json backend/pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

# 复制后端源代码并构建
COPY backend/ .
RUN pnpm run build

# 阶段3: 运行时镜像
FROM node:20-alpine

WORKDIR /app

# 1. 安装nginx和pm2
RUN apk add --no-cache nginx && \
    npm install -g pm2 pnpm

# 2. 复制前端构建结果
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# 3. 复制后端构建结果和必要文件
COPY --from=backend-builder /app/backend/dist ./backend/dist
COPY --from=backend-builder /app/backend/bootstrap.js ./backend/
COPY --from=backend-builder /app/backend/package.json ./backend/
COPY --from=backend-builder /app/backend/pnpm-lock.yaml ./backend/

# 4. 复制nginx配置
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

# 5. 复制pm2配置文件
COPY ecosystem.config.js .

# 6. 安装后端生产依赖
WORKDIR /app/backend
RUN pnpm install --prod

# 7. 设置工作目录
WORKDIR /app

# 暴露端口
EXPOSE 80

# 启动命令
CMD ["pm2-runtime", "ecosystem.config.js"]