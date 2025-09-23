# --- Etapa 1: Build ---
# Usamos una imagen de Node.js v10. Esta versión es compatible con las dependencias
# antiguas de tu proyecto como node-sass@4 y evita los errores de compilación.
FROM node:10-alpine AS build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el package.json y package-lock.json (si existe)
# Esto aprovecha el caché de Docker: si no cambian, no se vuelve a ejecutar 'npm install'
COPY package*.json ./

# Instalar todas las dependencias del proyecto
RUN npm install

# Copiar el resto del código fuente de la aplicación
COPY . .

# Ejecutar el script de build que genera los archivos estáticos en la carpeta /app/dist
RUN npm run build

# --- Etapa 2: Producción ---
# Usar una imagen de Nginx súper ligera para servir los archivos estáticos.
FROM nginx:1.25-alpine

# El build de Vue CLI 2 genera una carpeta 'dist'. 
COPY --from=build /app/dist /usr/share/nginx/html


COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 8087

# Comando para iniciar el servidor Nginx
CMD ["nginx", "-g", "daemon off;"]
