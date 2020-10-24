const moment = require("moment");

module.exports = (query, data) => {
  if (query.includes("time") || query.includes("date"))
    data.answer = moment().format("LLL");
};
