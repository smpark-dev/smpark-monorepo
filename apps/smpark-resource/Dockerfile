FROM node:20.14.0 AS base

WORKDIR /usr/src/resource

COPY .yarn .yarn
COPY .pnp.* ./
COPY package.json yarn.lock ./

# 설정 파일들
COPY apps/smpark-resource/*.config.js apps/smpark-resource/*.config.mjs ./
COPY tsconfig.base.json ./
COPY apps/smpark-resource/tsconfig*.json ./tsconfig/sub-config/

FROM base AS production
COPY dist ./dist 
# Prod 글로벌 yarn을 사용 -> corepack 연결 -> 지정 yarn 사용 변경
RUN corepack enable 
ENV NODE_ENV=production
EXPOSE 5000
CMD ["yarn", "smpark-resource:prod"]

FROM base AS staging
COPY dist ./dist 
RUN corepack enable 
ENV NODE_ENV=staging
EXPOSE 5001  
CMD ["yarn", "smpark-resource:staging"]

FROM base AS development
RUN corepack enable 
ENV NODE_ENV=development
EXPOSE 5005
CMD ["yarn", "dev"]