const handlers = ["math", "url"];

module.exports = async (query) => {
  const data = {
    items: [],
  };

  for (let i = 0; i < handlers.length; i++) {
    await require(`./${handlers[i]}`)(query, data);
  }

  for (let i = 0; i < Math.floor(Math.random() * 5) + 2; i++)
    data.items.push({ text: "test" });

  data.items = data.items.slice(0, 10);
  return data;
};
