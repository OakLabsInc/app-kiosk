
const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.static('src/public'));

app.get('/sayhello', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
// const { screen, app, BrowserWindow } = require("electron");
// const args = require('minimist')(process.argv)
// const display_id = args.displayid || 0
// const { join } = require('path')
// const express = require('express')


// const exapp = express()
// http = require('http'),
//   httpServer = http.Server(exapp);

// let publicPath = join(__dirname, 'src/public')
// let port = 8080
// exapp.use(express.static(publicPath))
// exapp.listen(port)
// exapp.get('/', function(req, res) {
//   res.sendFile(join(__dirname, 'src','public', 'index.html'));
//   console.log(`Now serving ${publicPath} on http://127.0.0.1:${port}`)
// });

// console.log('VERSIONS: ', process.versions)
// console.log('ENV: ', process.env)
// function createWindow() {
//   let displays = screen.getAllDisplays();
//   const win = new BrowserWindow({
//     x: displays[display_id].workArea.x,
//     y: displays[display_id].workArea.y,
//     width: displays[display_id].workArea.width,
//     height: displays[display_id].workArea.height,
//     fullscreen: true,
//     kiosk: true,
//     frame: false,
//     webPreferences: {
//         // preload: path.join(__dirname, 'preload.js'),
//         nodeIntegration: false,
//         contextIsolation: false
//     }
//   });

//   win.loadURL('http://localhost:80');
// }

// app.whenReady().then(() => {
//   //createWindow();
// });

