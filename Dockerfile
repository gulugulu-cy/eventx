# 阶段1: 前端构建
FROM node:20 AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package.json frontend/pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY frontend .
RUN pnpm run build && \
    rm -rf node_modules  # 清理开发依赖

# 阶段2: 后端构建
FROM node:20 AS backend-builder
WORKDIR /app/backend
COPY backend/package.json backend/pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY backend .
RUN pnpm run build && \
    rm -rf node_modules  # 清理开发依赖

# 阶段3: 运行时镜像
FROM node:20-alpine
WORKDIR /app

# 复制前端（显式指定 dist 目录）
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# 复制后端
COPY --from=backend-builder /app/backend/dist ./backend
COPY --from=backend-builder /app/backend/bootstrap.js ./backend/
COPY --from=backend-builder /app/backend/package.json ./backend/
COPY --from=backend-builder /app/backend/pnpm-lock.yaml ./backend/

# 安装生产依赖并清理缓存
RUN npm install -g pnpm && \
    cd backend && pnpm install --prod && \
    npm cache clean --force && \
    rm -rf /tmp/*

# 安装 Nginx 和 PM2（合并 RUN 减少层数）
RUN apk add --no-cache nginx && \
    npm install -g pm2 && \
    mkdir -p /var/log/nginx

# 复制配置文件
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY ecosystem.config.js .

# 设置日志权限
RUN chown -R nginx:nginx /var/log/nginx

EXPOSE 80 7001
CMD ["pm2-runtime", "ecosystem.config.js"]