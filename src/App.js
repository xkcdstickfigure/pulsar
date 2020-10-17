import React, { useState, useEffect } from "react";
import Twemoji from "react-twemoji";
import "./style.css";
import "./inter/inter.css";

export default () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState({
    items: [],
  });

  // Handle Input
  useEffect(() => {
    window.Pulsar.query(query).then((response) => setData(response));
  }, [query]);

  const formSubmit = (e) => e.preventDefault();

  return (
    <Twemoji>
      <form onSubmit={formSubmit}>
        <input
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What's up?"
          autoFocus
        />
      </form>
      {data.answer && <div className="answer">{data.answer}</div>}
      {data.items.map((item, i) => (
        <div className="item" key={i}>
          {item.text}
        </div>
      ))}
    </Twemoji>
  );
};
