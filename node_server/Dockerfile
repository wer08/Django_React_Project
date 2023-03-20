FROM node:16
WORKDIR /node_server
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]