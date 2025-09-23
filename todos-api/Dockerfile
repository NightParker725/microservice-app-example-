FROM node:16-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 8082
CMD ["node","server.js"]
