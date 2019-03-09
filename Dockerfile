FROM node:10

WORKDIR /opt/application

RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.2/dumb-init_1.2.2_amd64
RUN chmod +x /usr/local/bin/dumb-init
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

CMD ["dumb-init", "npm", "start"]
