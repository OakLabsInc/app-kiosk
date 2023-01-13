# app-kiosk

This is a POC that demonstrates the ability to deploy to [Balena](https://www.balena.io/) through the use of [GitHub Actions](https://github.com/OakLabsInc/app-kiosk/actions). This is set to build and deploy to Balena using the [Balena Workflow File](https://github.com/OakLabsInc/app-kiosk/blob/main/.github/workflows/balena.yml). The Balena API key is stored in the settings under [Secrets](https://github.com/OakLabsInc/app-kiosk/settings/secrets/actions)

## Docker Containers

The docker containers used in this POC are all described in the docker-compose.yml which is read by the Balena Action. There are five containers in which we have three ones that reside here. The others two are Balena Blocks and are pulled from the balena repositories during build time.

### [app-cups](https://github.com/OakLabsInc/app-kiosk/tree/main/app-cups)

This is a custom print driver container that runs an nginx server to send jobs to an Epson printer TM-T88V. It can be extended to print to other PPD printers. Documentation is needed for this container.

### [app-kiosk](https://github.com/OakLabsInc/app-kiosk/tree/main/app-kiosk)

This container is in charge of housing the UI Interface. It runs with a node:14.16.1-slim as its base OS. It has a node back end that can have its own API to be used to communicate with other containers from the UI running in an Express server.

### [component-payment-verifone](https://github.com/OakLabsInc/app-kiosk/tree/main/component-payment-verifone)

To date it runs a node sever as well that can trigger a PSDK compiled binary to interact with a UX700 terminal via tcpip and a IP address of that terminal. To shorcut development time the PSDK linux example app is utilized to actually send information to the terminal like payment information. It uses an older automation tool called `expect` - The expect command runs Expect program scripts. We wrote an expect script that sends the UI amount to a node GET endpoint that executes this script and passes the parameters to the terminal PSDK application.

### [browser](https://github.com/balena-labs-projects/browser)

This is a Balena block that runs an instance of Chromium and is configurable to display the app-kiosk html pages. You can read more about this block in the [balena browser project](https://github.com/balena-labs-projects/browser).

This container provides a hardware accelerated web browser to present internal and external URLs on a connected display. The browser block is a docker image that runs a Chromium browser via X11, optimized for balenaOS. The block provides an API for dynamic configuration, and also exposes the Chromium Remote Debug port.

### [wifi-connect](https://github.com/balena-os/wifi-connect)

Another Balena block that is used to setup.

[WiFi Connect](https://github.com/balena-os/wifi-connect) is a utility for dynamically setting the WiFi configuration on a Linux device via a captive portal. WiFi credentials are specified by connecting with a mobile phone or laptop to the access point that WiFi Connect creates.

## Preview the app-kiosk html

This html is best previewed with the npm module [live-server](https://www.npmjs.com/package/live-server).

#### Installation

You need node.js and npm. You should probably install this globally.

``` bash
npm install -g live-server
```

#### Usage

Navigate to the html source directory from the root of this project.

``` bash
cd app-kiosk/src/public
```

then start the live-server

```bash
live-server
```


