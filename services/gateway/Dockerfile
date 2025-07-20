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

WORKDIR /app/services/gateway


CMD ["npm", "run", "dev"]