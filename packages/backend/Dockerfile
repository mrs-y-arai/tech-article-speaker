# Node 22 + Playwright + ブラウザ入りの最強イメージ
FROM mcr.microsoft.com/playwright:v1.51.1-noble

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY pnpm-lock.yaml ./
COPY package.json ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN npx prisma generate

RUN pnpm playwright install

RUN pnpm build

CMD ["pnpm", "build"]