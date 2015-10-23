// This is main process of Electron, started as first thing when the Electron
// app starts, and running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

var app = require('app');
var BrowserWindow = require('browser-window');
var env = require('./vendor/electron_boilerplate/env_config');
var devHelper = require('./vendor/electron_boilerplate/dev_helper');
var windowStateKeeper = require('./vendor/electron_boilerplate/window_state');

var mainWindow;

// Preserver of the window size and position between app launches.
var mainWindowState = windowStateKeeper('main', {
  width: 880,
  height: 700,
});

app.on('ready', function() {

  mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    icon: '../resources/icon.png',
  });
  
  mainWindow.setMenuBarVisibility(false);

  if (mainWindowState.isMaximized) {
    mainWindow.maximize();
  }

  if (env.name === 'test') {
    mainWindow.loadUrl('file://' + __dirname + '/spec.html');
  } else {
    mainWindow.loadUrl('file://' + __dirname + '/app.html');
  }

  mainWindow.on('close', function () {
    mainWindowState.saveState(mainWindow);
  });
    
  mainWindow.setMenuBarVisibility(false);
});

app.on('window-all-closed', function () {
  app.quit();
});
