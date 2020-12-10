const getApps = require("../util/getApps");
const leven = require("leven");

module.exports = async (query, data) => {
  data.items = data.items.concat(
    (await getApps())
      .map((app) => ({
        ...app,
        leven: leven(app.name.toLowerCase(), query.toLowerCase()),
      }))
      .filter((app) => app.leven / app.name.length <= 0.5)
      .slice(0, 2)
      .sort((a, b) => a.leven - b.leven)
      .map((app) => ({
        text: `Launch ${app.name}`,
        exec: app.exec,
      }))
  );
};
