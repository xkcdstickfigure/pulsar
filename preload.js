const { ipcRenderer, shell, remote } = require("electron");
const paths = require("env-paths")("pulsar", { suffix: "" });
const fs = require("fs");
const { exec } = require("child_process");

// Get theme stylesheet
let theme = "";
try {
  theme = fs.readFileSync(`${paths.config}/theme.css`, "utf8");
} catch (err) {}

// Set window height
const minHeight = 75;
let height = 75;
setInterval(() => {
  try {
    let h = Math.ceil(
      document.querySelector("#root").getBoundingClientRect().height
    );
    if (h < minHeight) h = minHeight;
    if (height !== h) {
      height = h;
      ipcRenderer.send("set-height", h);
    }
  } catch (err) {}
}, 10);

// Pulsar object
window.Pulsar = {
  // Query
  query: (id, query) =>
    new Promise((resolve) => {
      ipcRenderer.on(`query-${id}`, (_event, data) => resolve(data));
      ipcRenderer.send("query", id, query);
    }),

  // Send Response
  sendResponse: (response) => ipcRenderer.send("response", response),

  // Execute Command
  exec: (command) => exec(command),

  // Close Window
  close: () => remote.getCurrentWindow().close(),

  // Open URL
  openUrl: (url) => shell.openExternal(url),

  // Theme CSS
  theme,
};

// On Data
ipcRenderer.on("data", (_event, data) => (window.Pulsar.data = data));
