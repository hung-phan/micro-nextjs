FROM node:10 as builder

WORKDIR /opt/application

COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:8

WORKDIR /opt/application

RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.1/dumb-init_1.2.1_amd64
RUN chmod +x /usr/local/bin/dumb-init
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .
COPY --from=builder /opt/application/.next ./next
COPY --from=builder /opt/application/.next_server ./next_server

CMD ["dumb-init", "npm", "start"]
