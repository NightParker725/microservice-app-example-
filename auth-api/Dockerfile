# Etapa de build
# Se mantiene la versión de Go, ya que tu código probablemente es compatible.
FROM golang:1.25.1-alpine AS build

# Instalar git, necesario para descargar dependencias de Go
RUN apk add --no-cache git

WORKDIR /src

# Copiar solo los archivos de dependencias primero para aprovechar el caché de Docker
COPY go.mod go.sum ./

# Descargar las dependencias
RUN go mod download

# Copiar el resto del código fuente
COPY . .

# Compilar la aplicación
RUN go build -o /auth-api

# Etapa final - Usar una imagen base mínima
FROM alpine:3.19
WORKDIR /app

EXPOSE 8081

# --- ¡LA SOLUCIÓN! ---
# Copiar el ejecutable compilado desde la etapa 'build' al contenedor final.
COPY --from=build /auth-api /auth-api

# Copiar el script de espera y darle permisos
COPY ./wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh




