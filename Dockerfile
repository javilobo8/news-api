FROM node:8-slim

RUN mkdir /opt/app
WORKDIR /opt/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . ./

EXPOSE 8000
CMD ["npm", "start"]