FROM golang:1.25.1-alpine AS build
RUN apk add --no-cache git
WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o /auth-api

FROM alpine:3.19
WORKDIR /app
EXPOSE 8081
COPY --from=build /auth-api /auth-api
COPY ./wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh




