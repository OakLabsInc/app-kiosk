const { screen, app, BrowserWindow } = require("electron");
const args = require('minimist')(process.argv)
const display_id = args.displayid || 0


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

  win.loadFile("src/public/index.html");
}

app.whenReady().then(() => {
  createWindow();
});

