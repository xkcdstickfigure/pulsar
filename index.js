const { app, BrowserWindow, globalShortcut, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const handleQuery = require("./query");

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
      enableRemoteModule: true,
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
  const width = win.getSize()[0];
  win.setMinimumSize(width, height);
  win.setSize(width, height);
  win.center();
});

// Query
ipcMain.on("query", async (event, id, query) =>
  event.reply(`query-${id}`, { id, ...(await handleQuery(query)) })
);
