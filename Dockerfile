FROM node:10-stretch

WORKDIR /app

COPY . /app

RUN npm i && cd frontend && npm i

EXPOSE 3000 8000

CMD ["npm", "run", "container"]