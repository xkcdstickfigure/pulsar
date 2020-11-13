const { app, BrowserWindow, globalShortcut, ipcMain } = require("electron");
const electronDev = require("electron-is-dev");
const handleQuery = require("./query");
const { apiUrl, axiosOptions } = require("./config");
const axios = require("axios");
const os = require("os");
let dev = electronDev;

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
    electronDev
      ? "http://localhost:5000"
      : `file://${__dirname}/build/index.html`
  );
  win.on("ready-to-show", win.show);

  // Close on blur
  win.on("blur", () => {
    if (!dev) win.close();
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
if (!electronDev) autoLauncher.enable();

// Update Window Height
ipcMain.on("set-height", (_event, height) => {
  const width = win.getSize()[0];
  win.setMinimumSize(width, height);
  win.setSize(width, height);
  win.center();
});

// Query
ipcMain.on("query", async (event, id, query) => {
  try {
    const response = await handleQuery(query);
    if (query === "I am a developer") {
      dev = true;
      if (win) win.webContents.openDevTools();
      response.banner = "Developer Mode Enabled";
    }
    event.reply(`query-${id}`, {
      id,
      ...response,
    });
  } catch (err) {}
});

// Response
ipcMain.on("response", (_event, response) =>
  axios
    .post(`${apiUrl}/response`, { response }, axiosOptions)
    .then(() => {})
    .catch(() => {})
);

// Fetch Data
let data;
const fetchData = async () => {
  try {
    data = (await axios.get(`${apiUrl}/data`, axiosOptions)).data;
  } catch (err) {
    if (err.response) data = err.response.data;
    else data = undefined;
  }
};
fetchData();
setInterval(fetchData, 1000);

// Connect Token
let connectToken;
axios
  .post(
    `${apiUrl}/connectToken`,
    {
      name: os.hostname(),
      platform: os.platform(),
    },
    axiosOptions
  )
  .then((res) => {
    connectToken = res.data.token;
    setInterval(() => {
      if (!data || data.err)
        axios
          .post(
            `${apiUrl}/activate`,
            {
              token: connectToken,
            },
            axiosOptions
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch(() => {});
    }, 5000);
  })
  .catch(() => {});

// Pass Data to Renderer
setInterval(() => {
  if (win)
    win.webContents.send(
      "data",
      data && {
        ...data,
        connectToken,
      }
    );
}, 50);
