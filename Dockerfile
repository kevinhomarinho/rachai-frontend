FROM node:18.18.2-bullseye as base

FROM base as deps
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci

FROM base as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY app app
COPY public public
COPY .eslintrc.json .
COPY middleware.ts .
COPY next.config.js .
COPY package-lock.json .
COPY package.json .
COPY tsconfig.json .
RUN npm run build

FROM base as runner
WORKDIR /app

ENV NODE_ENV production

RUN echo "NEXT_PUBLIC_BACKEND_URL=http://backend:8080" > /app/.env

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone .
COPY --from=builder --chown=nextjs:nodejs /app/.next/static .next/static


USER nextjs

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

ENTRYPOINT ["/bin/bash", "-c", "node server.js"]