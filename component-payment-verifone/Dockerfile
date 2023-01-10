FROM debian:bullseye-slim

WORKDIR /app

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
    && apt-get -yq install --no-install-recommends nodejs npm expect\
    && mkdir -p /home/rjoffray/verifone/linux/lib

COPY . /app
COPY libPaymentSdk.* /home/rjoffray/verifone/linux/lib/

RUN npm install --production
EXPOSE 9001
ENTRYPOINT [ "node" ]
CMD ["server.js"]

ENV TZ=America/Los_Angeles \
    PORT=9001 \
    APPLICATION_PORT=80 