ARG NODE_VERSION=20


FROM node:${NODE_VERSION}-alpine AS base

ARG USER_ID=1000
ARG GROUP_ID=1000

WORKDIR /app

RUN apk update && apk add curl unzip bash

RUN if getent group ${GROUP_ID}; then \
        existing_group=$(getent group ${GROUP_ID} | cut -d: -f1); \
        sed -i "s/^${existing_group}:/robotics:/" /etc/group; \
    else \
        addgroup -g ${GROUP_ID} robotics; \
    fi && \
    if getent passwd ${USER_ID}; then \
        existing_user=$(getent passwd ${USER_ID} | cut -d: -f1); \
        sed -i "s/^${existing_user}:/robotics:/" /etc/passwd; \
    else \
        adduser -u ${USER_ID} -G robotics -s /bin/sh -D robotics; \
    fi

RUN curl -fsSL https://bun.sh/install | bash && \
    mv /root/.bun/bin/bun /usr/local/bin/bun

RUN chown -R robotics:robotics /app

FROM base AS deps

# https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
RUN apk update
RUN apk add --no-cache libc6-compat git openssl

WORKDIR /app

COPY package.json bun.lock ./

USER robotics
RUN --mount=type=cache,uid=${USER_ID},gid=${GROUP_ID},target=/home/robotics/.bun/install/cache \
    bun install --frozen-lockfile --verbose


FROM base AS dev

WORKDIR /app
COPY --from=deps --chown=robotics:robotics /app/node_modules ./node_modules
COPY --chown=robotics:robotics . .
USER robotics
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS builder

WORKDIR /app

COPY --from=deps --chown=robotics:robotics /app/node_modules ./node_modules
COPY --chown=robotics:robotics . .
USER robotics
ENV NEXT_TELEMETRY_DISABLED=1

RUN bun x prisma generate

RUN bun run build


FROM base AS runner

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

RUN apk add postgresql-client

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

USER nextjs

ENV PORT=3000
ENV HOSTNAME="::"

CMD ["node", "server.js"]
