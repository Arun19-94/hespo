FROM node:alpine



COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

WORKDIR ./dist

CMD ["npm", "start"]