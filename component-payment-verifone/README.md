# Payment Demo Application

Example Component for OakOS v5.0.X

> Not for production use!


## Running locally

Make sure that you are running the right version of Node locally. You will find the required version in the `.nvmrc` file
If you are not running the same version (`node -v`) then you will need to run

``` bash
nvm install $(cat .nvmrc)
npm run rebuild
```

### Now you can run locally

``` bash
npm run dev
```

### Running in a docker container

``` bash
xhost +
docker-compose up --build
```

### Shutting down the  docker container

``` bash
docker-compose down
```

### Full Terminal APPDEV install

You will need access to Verifone Artifactory
 
download

https://artifactory.verifone.com/artifactory/RMS_Release_CLW/CarbonMobile5/ux700/stable/UX700-Q-4.31.1/secure-signed/fastboot_appdev_UX700-Q-4.31.1_Full_Platform.zip

and 

https://artifactory.verifone.com/artifactory/RMS_Release_CLW/keystone/com/verifone/solution/northamericaslim/CacheNaSlimAllDefaultDevkit/5.331.3/CacheNaSlimAllDefaultDevkit-5.331.3.img

you can't do fastboot over WiFi but you can do adb over WiFi

after unzipping the `fastboot_appdev_UX700-Q-4.31.1_Full_Platform.zip` put the `CacheNaSlimAllDefaultDevkit-5.331.3.img` file inside full install folder 

then `adb reboot fastboot`

then you do this in terminal while in the full install folder   

`flash-all-ux700-full.sh -F CacheNaSlimAllDefaultDevkit-5.331.3.img`

then `fastboot reboot` and wait till secondary install happens
 
I had to do this to get all the right apps installed
`adb reboot fastboot`
then `fastboot flash cache CacheNaSlimAllDefaultDevkit-5.331.3.img`
then `fastboot reboot`

