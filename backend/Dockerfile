FROM node:alpine

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

WORKDIR ./dist

EXPOSE 5001

CMD ["npm", "start"]