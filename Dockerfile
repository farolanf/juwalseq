FROM node:10-stretch

WORKDIR /app

COPY . /app

RUN npm i 

RUN cd frontend && npm i

RUN cd frontend && npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]