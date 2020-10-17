const {
  app,
  BrowserWindow,
  globalShortcut,
  ipcMain,
  screen,
} = require("electron");
const isDev = require("electron-is-dev");

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
      preload: `${__dirname}/preload.js`,
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

// Prevent stopping app when windows close
app.on("window-all-closed", (e) => e.preventDefault());

// Autolaunch
const AutoLaunch = require("auto-launch");
const autoLauncher = new AutoLaunch({
  name: "Pulsar",
});
if (!isDev) autoLauncher.enable();

// Update Window Height
ipcMain.on("set-height", (_event, height) => {
  win.setSize(win.getSize()[0], height);
  win.center();
});
