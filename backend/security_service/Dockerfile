FROM node:alpine

WORKDIR /usr/src/app

COPY package.json .

RUN yarn install

COPY ./dist .

EXPOSE 8080

CMD [ "node", "server.js" ]
