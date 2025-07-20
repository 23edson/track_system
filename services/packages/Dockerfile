# Dockerfile
FROM node:alpine


WORKDIR /app


COPY package*.json ./
COPY services/gateway/package*.json ./services/gateway/
COPY services/packages/package*.json ./services/packages/ 
COPY services/locations/package*.json ./services/locations/
COPY services/socket/package*.json ./services/socket/
COPY resources/package*.json ./resouces/
RUN npm install

COPY . .

WORKDIR /app/services/packages


RUN apk add --no-cache bash wget && \
    wget https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /usr/local/bin/wait-for-it.sh && \
    chmod +x /usr/local/bin/wait-for-it.sh && \
    apk del wget # Limpeza

# Espere que o mongo esteja na porta 27017 antes de iniciar o packages_service
CMD ["wait-for-it.sh", "mongo:27017", "--", "npm", "run", "dev"]