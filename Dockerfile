# 前端构建阶段
FROM node:20 AS frontend-builder

WORKDIR /app/frontend

COPY frontend/package.json frontend/pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

COPY frontend .
RUN pnpm run build

# 后端构建阶段
FROM node:20 AS backend-builder

WORKDIR /app/backend

COPY backend/package.json backend/pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

COPY backend .
RUN pnpm run build

# 最终阶段
FROM node:20

# 安装Node.js和PM2（用于运行后端）
RUN apk add --no-cache nodejs npm && \
    npm install -g pm2 pnpm

WORKDIR /app

# 复制前端构建结果
COPY --from=frontend-builder /app/frontend/dist /usr/share/nginx/html/assets/

# 复制nginx配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 复制后端构建结果
COPY --from=backend-builder /app/backend/dist ./backend/dist
COPY --from=backend-builder /app/backend/package.json ./backend/
COPY --from=backend-builder /app/backend/pnpm-lock.yaml ./backend/
COPY --from=backend-builder /app/backend/bootstrap.js ./backend/

# 安装后端生产依赖
WORKDIR /app/backend
RUN pnpm install --prod

# 复制PM2配置
COPY ecosystem.config.js .

# 创建日志目录
RUN mkdir -p /var/log/pm2

# 暴露端口
EXPOSE 80

# 启动服务
CMD ["sh", "-c", "pm2-runtime ecosystem.config.js & nginx -g 'daemon off;'"]