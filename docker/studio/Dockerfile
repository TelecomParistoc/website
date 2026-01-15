ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /build

RUN apk update && apk add curl unzip bash

RUN curl -fsSL https://bun.sh/install | bash

ENV PATH="${PATH}:/root/.bun/bin"

FROM base AS deps
RUN apk update
RUN apk add --no-cache libc6-compat git openssl

WORKDIR /app

RUN --mount=type=cache,target=/root/.bun/install/cache bun install --frozen-lockfile --verbose prisma

CMD ["bun", "x", "prisma", "studio", "--hostname", "0.0.0.0", "--port", "3001"]
