FROM node:alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn install

RUN yarn build

EXPOSE 8080

CMD [ "node", "dist/server.js" ]
