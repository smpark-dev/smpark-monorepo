FROM node:20.14.0 AS base

WORKDIR /usr/src/oauth

# Yarn PnP Zero Install 관련 파일들
COPY .yarn .yarn
COPY .pnp.* ./
COPY package.json yarn.lock ./

# 설정 파일들
COPY apps/smpark-oauth2.0/nodemon.json ./
COPY apps/smpark-oauth2.0/*.config.js apps/smpark-oauth2.0/*.config.mjs ./
COPY tsconfig.base.json ./
COPY apps/smpark-oauth2.0/tsconfig*.json ./tsconfig/sub-config/

FROM base AS production
# 빌드 파일
COPY dist ./dist 

# Prod 글로벌 yarn을 사용 -> corepack 연결 -> 지정 yarn 사용 변경
RUN corepack enable 

ENV NODE_ENV=production
EXPOSE 4000
CMD ["yarn", "smpark-oauth2.0:prod"]

FROM base AS development

# Prod 글로벌 yarn을 사용 -> corepack 연결 -> 지정 yarn 사용 변경
RUN corepack enable 

ENV NODE_ENV=development
EXPOSE 4004

CMD ["yarn", "dev"]