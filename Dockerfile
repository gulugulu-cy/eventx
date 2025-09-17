# 阶段1: 前端构建
FROM node:20 AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package.json frontend/pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY frontend .
RUN pnpm run build

# 阶段2: 后端构建（关键修复）
FROM node:20 AS backend-builder
WORKDIR /app/backend

# 1. 安装所有依赖（包括devDependencies）
COPY backend/package.json backend/pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

# 2. 复制源码并构建
COPY backend .
RUN pnpm run build && \
    rm -rf node_modules && \
    pnpm install --prod  # 重建生产依赖

# 阶段3: 运行时镜像
FROM node:20-alpine
WORKDIR /app

# 1. 安装 PM2 全局
# RUN npm install -g pm2

# 2. 复制前端
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# 3. 复制后端（关键改动！）
COPY --from=backend-builder /app/backend ./backend


# 4. 直接复用构建阶段的node_modules（避免重复安装）
RUN ls -la /app/backend/node_modules/@midwayjs  # 验证核心依赖

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