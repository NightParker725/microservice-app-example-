FROM golang:1.20-alpine AS build
WORKDIR /src
COPY . .
RUN go mod tidy && go build -o /bin/auth
FROM alpine:3.19
WORKDIR /app
COPY --from=build /bin/auth /app/auth
EXPOSE 8081
ENTRYPOINT ["/app/auth"]
