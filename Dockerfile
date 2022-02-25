FROM node:16.13.2
WORKDIR /webApp
COPY package.json package-lock.json yarn.lock ./
RUN yarn install && yarn cache clean && npm install
COPY . .
RUN yarn build
expose 9230