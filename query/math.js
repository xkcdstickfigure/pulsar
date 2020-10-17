const { evaluate } = require("mathjs");

module.exports = (query, data) => {
  try {
    const result = evaluate(query);
    if (typeof result === "number") {
      data.answer = result.toString();
    } else if (typeof result === "string") {
      data.answer = result;
    }

    if (data.answer === "69") data.answer += " (nice)";
  } catch (e) {}
};
