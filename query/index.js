const { apiUrl, axiosOptions } = require("../config");
const axios = require("axios");
const handlers = [
  "info",
  "math",
  "apps",
  "datetime",
  "url",
  "searchSuggestions",
];

module.exports = async (query) => {
  let data = {
    items: [],
  };

  for (let i = 0; i < handlers.length; i++) {
    await require(`./${handlers[i]}`)(query, data);
  }

  try {
    const apiResponse = (
      await axios.post(`${apiUrl}/query`, { query }, axiosOptions)
    ).data;
    data = {
      ...data,
      ...apiResponse,
      items: [...apiResponse.items, ...data.items],
    };
  } catch (err) {}

  data.items = data.items.slice(0, 10);
  return data;
};
