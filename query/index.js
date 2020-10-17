module.exports = async (query) => {
  return {
    items: query.split("").map((char, i) => ({
      text: `Character ${i}: ${char}`,
    })),
  };
};
