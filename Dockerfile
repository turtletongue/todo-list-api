FROM node:16.15.1-alpine3.16

WORKDIR /app

ENV NODE_ENV production

COPY package.json yarn.lock .

RUN yarn

COPY . .

RUN yarn compile

USER node

CMD ["yarn", "start"]