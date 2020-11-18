const {app, BrowserWindow} = require('electron');
const {url} = require('url');

var win = null;

function createwindow()
{
    win = new BrowserWindow({icon: __dirname+'/imgs/icon.png',webPreferences: {
        nodeIntegration: true
    }},);
    win.loadURL(`file://${__dirname}/index.html`);
}

app.on('ready', createwindow);
