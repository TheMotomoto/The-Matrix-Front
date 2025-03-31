FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && \
    pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

FROM node:22-alpine AS production
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && \
    pnpm install --frozen-lockfile --prod
COPY --from=builder /app/build ./build
EXPOSE 3000
CMD ["pnpm", "start"]
