module.exports = async (query) => {
  console.log(query);
  return {
    items: query.split("").map((char, i) => `Character ${i}: ${char}`),
  };
};
