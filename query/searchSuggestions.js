const axios = require("axios");

module.exports = async (query, data) => {
  let suggestions = [];
  try {
    suggestions = (
      await axios.get(
        `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(
          query
        )}`
      )
    ).data[1];
  } catch (err) {}

  data.items.push({
    text: `🔍 ${query}`,
    url: `https://google.com/search?q=${encodeURIComponent(query)}`,
  });

  suggestions.forEach((s) => {
    if (s !== query && !s.startsWith("= "))
      data.items.push({
        text: `🔍 ${s}`,
        url: `https://google.com/search?q=${encodeURIComponent(s)}`,
      });
  });
};
