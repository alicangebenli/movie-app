FROM node:14-alpine3.15
WORKDIR /src
COPY package.json /src
RUN npm install
RUN npm install pm2 -g
COPY . .
EXPOSE 3000
CMD pm2-runtime start server/server.js --name nodejs --watch
