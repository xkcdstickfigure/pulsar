const paths = require("env-paths")("pulsar", { suffix: "" });
const fs = require("fs");
const { app } = require("electron");

// Create Config Directory
if (!fs.existsSync(paths.config))
  fs.mkdirSync(paths.config, { recursive: true });

// API URL and Credentials
let apiUrl = "https://pulsar-api.alles.cc/api",
  credentials;

try {
  apiUrl = fs.readFileSync(`${paths.config}/api`, "utf8").trim();
} catch (err) {}

try {
  credentials = require(`${paths.config}/credentials.json`);
} catch (err) {}

// Export Config
module.exports = {
  paths,
  apiUrl,
  axiosOptions: {
    headers: {
      "user-agent": "Pulsar",
      "x-pulsar-version": app.getVersion(),
    },
    auth: credentials && {
      username: credentials.id,
      password: credentials.secret,
    },
  },
};
