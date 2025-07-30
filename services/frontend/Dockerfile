# Dockerfile
FROM node:alpine as builder
WORKDIR /app


COPY ./services/frontend/package*.json ./
COPY ./services/frontend/tsconfig*.json ./
COPY ./services/frontend/vite.config.ts ./

RUN npm install 
COPY ./services/frontend ./
RUN npm run build

# Etapa 2: servidor Nginx
FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
