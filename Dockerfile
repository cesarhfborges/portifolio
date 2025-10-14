# Stage 1: Build da aplicação Angular com Node 14
FROM node:18-alpine AS build

# Diretório de trabalho
WORKDIR /app

# Instala dependências nativas necessárias para compilação de pacotes
RUN apk add --no-cache python3 make g++

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do projeto
COPY . .

# Build de produção do Angular
RUN npm run build --prod

# Stage 2: Servir com Nginx
FROM nginx:alpine

# Copia o build da aplicação para o Nginx
COPY --from=build /app/dist/browser /usr/share/nginx/html

# Copia config do nginx (opcional)
COPY ./default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
