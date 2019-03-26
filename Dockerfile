FROM node:10-stretch

WORKDIR /app

COPY . /app

RUN npm i

RUN npm prune --production

RUN node_modules/.bin/modclean -n 'default:*' -r

RUN cd frontend && npm i

RUN cd frontend && npm run build

RUN cp frontend/public public -r

RUN rm frontend -rf

EXPOSE 3000

CMD ["npm", "run", "start:prod"]