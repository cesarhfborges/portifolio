# Stage 1: Build the Angular application
FROM node:lts-alpine AS build
WORKDIR /app

# Instalar dependências de build (caso precise compilar algo nativo)
RUN apk add --no-cache python3 make g++

# Copiar arquivos do Node
COPY package*.json ./
RUN npm install

# Copiar resto do código
COPY . .

# Build de produção
RUN npm run build --prod

# Stage 2: Serve the application with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]