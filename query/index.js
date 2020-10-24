const handlers = [
  "info",
  "math",
  "datetime",
  "url",
  "sites",
  "searchSuggestions",
];

module.exports = async (query) => {
  const data = {
    items: [],
  };

  for (let i = 0; i < handlers.length; i++) {
    await require(`./${handlers[i]}`)(query, data);
  }

  data.items = data.items.slice(0, 10);
  return data;
};
