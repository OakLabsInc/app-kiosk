FROM debian:bullseye-slim

WORKDIR /app

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
    && apt-get -yq install --no-install-recommends \
        nodejs \
        npm \
        expect\
        curl \
        libdrm2 \
        libgbm1 \
        libxkbcommon-x11-0 \
        libfribidi-dev \
        libgtk2.0-0 \
        libxshmfence1 \
        libasound2-dev \
        libgdk-pixbuf2.0-0 \
        libglib2.0-0 \
        libgtk-3-0 \
        libjbig-dev \
        libjpeg-dev \
        liblzma-dev \
        libnss3 \
        libx11-xcb1 \
        libxss1 \
        libxtst6 \
        libgles2-mesa \
        mesa-vdpau-drivers \
        xserver-xorg \
        xserver-xorg-legacy \
        xinit \
        xterm \
        x11-xserver-utils \
        jq \
        usbutils \
        libusb-1.0.0-dev \
        libudev-dev \
        x11-xkb-utils \
        xfonts-utils \
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