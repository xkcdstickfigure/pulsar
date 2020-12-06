const { app } = require("electron");
const { paths } = require("../config");

module.exports = (query, data) => {
  if (query === "version")
    data.answer = `You're running Pulsar v${app.getVersion()}`;
  else if (query === "config") data.answer = paths.config;
  else if (query === "restart")
    data.items.push({
      text: "Restart Pulsar",
      response: "$restart",
    });
};
