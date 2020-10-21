const { evaluate } = require("mathjs");

module.exports = (query, data) => {
  if (query === "version") return;

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
  if (answer) data.answer = answer;
};
