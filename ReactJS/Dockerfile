FROM node:16.13.0 AS builder
WORKDIR /dist
COPY ./package.json ./
COPY ./package-lock.json ./

COPY . .
RUN npm ci

CMD ["npm", "run", "dev"]