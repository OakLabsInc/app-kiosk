FROM node:14.16.1-slim


WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install --production && npm cache clean --force

COPY . /app

CMD ["node","main.js"]

EXPOSE 80

ENV TZ=America/Los_Angeles \
    PAYMENT_PORT=9001 \
    TERMINAL_IP=192.168.31.26 \
    PORT=80 \
    NODE_ENV=production \
    REMOTE_URL=http://www.google.com