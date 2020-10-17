const { ipcRenderer } = require("electron");

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
