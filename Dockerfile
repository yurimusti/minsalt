FROM node:18-alpine

WORKDIR /app

RUN yarn

CMD [ "yarn", "start:dev" ]

COPY dist .

RUN yarn

CMD [ "node", "index.js" ]

EXPOSE 4000