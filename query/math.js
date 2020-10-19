const { evaluate } = require("mathjs");

module.exports = (query, data) => {
  let answer;

  try {
    const result = evaluate(query.replace(/x/g, "*"));
    if (typeof result === "number") {
      answer = result.toString();
    } else if (typeof result === "string") {
      answer = result;
    }
  } catch (e) {}

  if (answer === query) return;
  if (answer === "69") answer += " (nice)";

  data.answer = answer;
};
