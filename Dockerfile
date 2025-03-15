FROM node:23-bookworm-slim

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . ./

RUN npm run build

EXPOSE 9999

CMD [ "node", "dist/main.js" ]
