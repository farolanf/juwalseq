FROM node:10-stretch

WORKDIR /app

COPY server /app/server

COPY .sequelizerc package.json /app/

RUN npm i

RUN npm prune --production

RUN node_modules/.bin/modclean -n 'default:*' -r

EXPOSE 3000

CMD ["npm", "run", "start:prod"]