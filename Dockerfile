FROM node:14
WORKDIR /app/
COPY package*.json angular.json ./
RUN npm install -g @angular/cli && npm install
