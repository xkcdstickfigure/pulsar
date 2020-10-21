const { app } = require("electron");

module.exports = (query, data) => {
  if (query === "version") {
    data.answer = `You're running Pulsar v${app.getVersion()}`;
  }
};
