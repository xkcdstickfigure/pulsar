const sites = require("../sites");

module.exports = (query, data) => {
  const site = sites[query.toLowerCase()];
  if (site) {
    data.items.push({
      text: `=> ${site}`,
      url: site,
    });
  }
};
