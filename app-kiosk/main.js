const { screen, app, BrowserWindow } = require("electron");
const args = require('minimist')(process.argv)
const display_id = args.displayid || 0
const { join } = require('path')
const express = require('express')


const exapp = express()
http = require('http'),
  httpServer = http.Server(exapp);

let publicPath = join(__dirname, 'src/public')

exapp.use(express.static(publicPath))
exapp.listen(80)
exapp.get('/', function(req, res) {
  res.sendFile(join(__dirname, 'src','public', 'index.html'));
});


function createWindow() {
  let displays = screen.getAllDisplays();
  const win = new BrowserWindow({
    x: displays[display_id].workArea.x,
    y: displays[display_id].workArea.y,
    width: displays[display_id].workArea.width,
    height: displays[display_id].workArea.height,
    fullscreen: true,
    kiosk: true,
    frame: false,
    webPreferences: {
        // preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
        contextIsolation: false
    }
  });

  win.loadURL('http://localhost:80', {"extraHeaders" : "pragma: no-cache\n"});
}

app.whenReady().then(() => {
  createWindow();
});

