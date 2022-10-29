FROM node:14.18.2 as build-deps
WORKDIR /usr/src/app
COPY package.json ./
RUN rm -rf node_modules yarn.lock yarn-error.log
RUN yarn
COPY . ./
RUN yarn build

FROM node:14-alpine3.15
WORKDIR /app
COPY --from=build-deps /usr/src/app/package.json ./
COPY --from=build-deps /usr/src/app/.env ./
COPY --from=build-deps /usr/src/app/build ./build
COPY --from=build-deps /usr/src/app/server ./server
RUN yarn add express axios dotenv
RUN yarn add pm2
EXPOSE 3000
CMD pm2-runtime start server/server.js --name nodejs --watch
