FROM node:14-alpine3.15

WORKDIR "/usr/app"

COPY ./package.json ./

RUN yarn install
RUN npm install pm2 -g

COPY . .

EXPOSE 80 443

CMD ["pm2-runtime", "app.js"]
