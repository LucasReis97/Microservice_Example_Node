FROM node:latest

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

# RUN tsc -p tsconfig.json
# RUN /usr/src/server/node_modules/typescript/bin/tsc -p /usr/src/app/src/tsconfig.json

EXPOSE 8080

CMD [ "node", "server.js" ]
