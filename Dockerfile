# Stage 1: Build dependencies
FROM node:20.12.2-alpine AS builder
WORKDIR /usr/src/app
COPY app/package*.json ./
RUN npm install --omit=dev

# Stage 2: Production runner
FROM node:20.12.2-alpine AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs && \
    adduser -S appuser -u 1001 -G nodejs

COPY --from=builder --chown=appuser:nodejs /usr/src/app/node_modules ./node_modules
COPY --chown=appuser:nodejs app/ .
USER appuser 

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

EXPOSE 3000
CMD ["node","index.js"]