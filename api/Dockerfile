# pull official base image
FROM node:16.3.0-alpine

COPY . .

RUN npm i

EXPOSE 8080

CMD ["./node_modules/.bin/ts-node", "server.ts"]
