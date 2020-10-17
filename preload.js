const { ipcRenderer } = require("electron");

window.Pulsar = {
  setHeight: (height) => ipcRenderer.send("set-height", height),
};
