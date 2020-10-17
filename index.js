const { app, BrowserWindow, globalShortcut } = require("electron");
const isDev = require("electron-is-dev");
const axios = require("axios");
const fs = require("fs");

// Prevent Multiple Instances
if (!app.requestSingleInstanceLock()) {
  console.log("Pulsar is already running!");
  process.exit();
}

// Create Window
let win;
const createWindow = () => {
  // Prevent Duplicate Input Windows
  if (win) return;

  // Create Window
  win = new BrowserWindow({
    width: 800,
    height: 75,
    frame: false,
    resizable: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
    },
    show: false,
  });
  win.loadURL(
    isDev ? "http://localhost:5000" : `file://${__dirname}/build/index.html`
  );
  win.on("ready-to-show", win.show);

  // Close on blur
  win.on("blur", () => {
    if (!isDev) win.close();
  });

  // On Close
  win.on("close", () => {
    win = null;
  });
};

app.on("ready", () => {
  // Shortcut
  globalShortcut.register(
    process.platform === "darwin" ? "Option+A" : "Alt+A",
    createWindow
  );
});

// Autolaunch
const AutoLaunch = require("auto-launch");
const autoLauncher = new AutoLaunch({
  name: "Pulsar",
});
if (!isDev) autoLauncher.enable();
