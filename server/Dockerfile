# 
# install
# 
FROM node:16.13.0 AS installer

WORKDIR /srv

COPY package.json yarn.lock ./
RUN yarn --production

COPY . .

# 
# build
# 
FROM installer AS builder

RUN yarn install \
    && yarn build

# 
# app
# 
FROM node:16.13.0

WORKDIR /srv
COPY --from=installer /srv .
COPY --from=builder /srv/dist ./dist

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "/srv/dist/main.js"]