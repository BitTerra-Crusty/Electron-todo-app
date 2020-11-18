const {app, BrowserWindow} = require('electron');
const {url} = require('url');

var win = null;

function createwindow()
{
    win = new BrowserWindow({minWidth: 1000,backgroundColor: '#2e2c29', icon: __dirname+'/imgs/icon.png',webPreferences: {
        nodeIntegration: true
    }},);
    win.loadURL(`file://${__dirname}/index.html`);
}

app.on('ready', createwindow);
