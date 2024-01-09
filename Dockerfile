# Stage 0 - Build Frontend Assets
FROM node:16.3.0-alpine

# RUN yarn version
RUN echo "node:"
RUN node -v

RUN echo "creating api, client folder"
WORKDIR /app

RUN mkdir /app/api
RUN mkdir /app/api/build
RUN mkdir /app/client

RUN echo "copying package.json files"

COPY package.json /app/
COPY ./api/package.json /app/api/
COPY ./api/yarn.lock /app/api/
COPY ./client/package.json /app/client/
COPY ./client/package-lock.json /app/client/

RUN echo "install node modules"

WORKDIR /app
RUN yarn install

WORKDIR /app/api
RUN yarn install --ignore-engines

WORKDIR /app/client
RUN yarn install --ignore-engines

RUN echo "copy other files"

COPY . /app/

RUN echo "build client"

WORKDIR /app/client
RUN yarn build

RUN echo "copy build content"
RUN mv /app/client/build/* /app/api/build

EXPOSE 8080

CMD ["/app/api/node_modules/.bin/ts-node", "/app/api/server.ts"]
