FROM node:14.16.1-slim

ARG DEBIAN_FRONTEND=noninteractive

WORKDIR /app

RUN printf "deb http://httpredir.debian.org/debian stretch-backports main non-free\ndeb-src http://httpredir.debian.org/debian stretch-backports main non-free" > /etc/apt/sources.list.d/backports.list \
    && apt-get update -q && apt-get install -t stretch-backports -y -q --no-install-recommends \
    apt-utils \
    build-essential \
    dbus-x11 \
    libasound2 \
    libcanberra-gtk-module \
    libcurl3 \
    libexif-dev \
    libgconf-2-4 \
    libgl1-mesa-dri \
    libgl1-mesa-glx \
    libgtk3.0 \
    libdrm-intel1 \
    libnotify4 \
    libnss3 \
    libusb-1.0-0 \
    libusb-1.0.0-dev \
    libxss1 \
    libxtst6 \
    libxcursor1 \
    python \
    xvfb \
    xauth

COPY . /app

RUN npm install \
    && npm test \
    && npm prune --production \
    && apt-get remove --purge -y xvfb xauth \
    && apt-get autoremove -y \
    && npm link \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* ~/.electron

ENTRYPOINT ["npm","start"]

ENV npm_config_target=13.1.7 \
    npm_config_runtime=electron \
    npm_config_arch=x64 \
    npm_config_target_arch=x64 \
    npm_config_disturl=https://atom.io/download/electron \
    DEBUG=false \
    NODE_ENV=production \
    ELECTRON_VERSION=13.1.7 \
    DISPLAY=:0 \
    IGNORE_GPU_BLACKLIST=false \
    NODE_TLS_REJECT_UNAUTHORIZED=0 \
    ELECTRON_DISABLE_SECURITY_WARNINGS=true \
    # nvidia card specific env vars
    PATH=/usr/local/nvidia/bin:$PATH \
    LD_LIBRARY_PATH=/usr/local/nvidia/lib:/usr/local/nvidia/lib64