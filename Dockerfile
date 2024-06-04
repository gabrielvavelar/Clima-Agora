FROM node:alpine

WORKDIR /project

COPY package*json ./
RUN npm install

COPY . .

EXPOSE 80

CMD ["npm","start"]

