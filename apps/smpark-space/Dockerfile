FROM node:20.14.0 AS base

WORKDIR /usr/src/space

COPY .yarn .yarn
COPY .pnp.* ./
COPY package.json yarn.lock ./

# 설정 파일들
COPY apps/smpark-space/*.config.js apps/smpark-space/*.config.mjs ./
COPY nx.json ./
COPY tsconfig.base.json ./
COPY apps/smpark-space/tsconfig*.json ./tsconfig/sub-config/

FROM base AS production

COPY apps/smpark-space/.next ./.next
COPY apps/smpark-space/public ./public

RUN corepack enable 

ENV NODE_ENV=production
EXPOSE 3000
CMD ["yarn", "smpark-space:prod"]
