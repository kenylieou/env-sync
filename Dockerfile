FROM node:11.3-alpine

WORKDIR /project

COPY package.json /project/package.json
COPY package-lock.json /project/package-lock.json
COPY env-sync.js /project/env-sync.js
COPY src /project/src

RUN npm install

ENTRYPOINT ["node", "/project/env-sync.js"]
