const { ipcRenderer } = require("electron");
const randomString = require("randomstring").generate;

// Set window height
const minHeight = 75;
let height = 75;
setInterval(() => {
  let h = document.querySelector("#root").getBoundingClientRect().height;
  if (h < minHeight) h = minHeight;
  if (height !== h) {
    height = h;
    ipcRenderer.send("set-height", h);
  }
}, 10);

// Pulsar object
window.Pulsar = {
  // Query
  query: (query) =>
    new Promise((resolve) => {
      const id = randomString(32);
      ipcRenderer.on(`query-${id}`, (_event, data) => resolve(data));
      ipcRenderer.send("query", id, query);
    }),
};
