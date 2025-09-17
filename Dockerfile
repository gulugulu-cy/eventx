# ======================
# 阶段1: 前端构建
# ======================
FROM node:20 AS frontend-builder

WORKDIR /app/frontend

# 复制前端文件
COPY frontend/package.json frontend/pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

# 复制剩余前端文件并构建
COPY frontend .
RUN pnpm run build

# ======================
# 阶段2: 后端构建
# ======================
FROM node:20 AS backend-builder

WORKDIR /app/backend

# 复制后端依赖文件
COPY backend/package.json backend/pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

# 复制剩余后端文件并构建
COPY backend .
RUN pnpm run build

# ======================
# 阶段3: 运行时镜像
# ======================

# 运行时镜像阶段
FROM node:20-alpine

WORKDIR /app

# 安装基础依赖
RUN apk add --no-cache nginx && \
    npm install -g pm2 pnpm

# 复制前端构建结果
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# 复制后端构建结果和必要文件
COPY --from=backend-builder /app/backend/dist ./backend/dist
COPY --from=backend-builder /app/backend/package.json ./backend/
COPY --from=backend-builder /app/backend/pnpm-lock.yaml ./backend/
COPY --from=backend-builder /app/backend/bootstrap.js ./backend/

# 安装后端生产依赖
WORKDIR /app/backend
RUN pnpm install --prod

# 复制配置文件
COPY nginx.conf /etc/nginx/nginx.conf
COPY ecosystem.config.js .

# 创建日志目录
RUN mkdir -p /var/log/pm2 /var/log/nginx

# 暴露端口
EXPOSE 80 7001

# 启动服务
CMD ["pm2-runtime", "ecosystem.config.js"]