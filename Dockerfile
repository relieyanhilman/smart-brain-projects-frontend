FROM node:16.16.0-slim

RUN mkdir -p /home/node/app/node_modules

WORKDIR /home/node/app

COPY package*.json ./

ENV PORT=$PORT
# API_URL=https://docker-smartbrain-backend.herokuapp.com \
# API_KEY=7980cbf1b1234dd38f9ac35b3dcf3f09

RUN npm install --force

COPY . .

CMD ["npm", "start"]