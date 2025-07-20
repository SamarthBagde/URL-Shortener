FROM node:18.9.1

WORKDIR /app

COPY package.json .

RUN npm install

EXPOSE 3001

COPY . .

CMD ["node", "server.js"]