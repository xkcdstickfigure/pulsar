const sites = require("../sites");

module.exports = (query, data) => {
  if (sites[query]) {
    data.items.push({
      text: `=> ${sites[query]}`,
      url: sites[query],
    });
  }
};
