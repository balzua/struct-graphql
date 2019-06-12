FROM node:10.13.0
COPY . /app

WORKDIR /app
RUN npm install

EXPOSE 4000

CMD ["npm", "start"]

