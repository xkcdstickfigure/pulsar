import React, { useState, useEffect } from "react";
import Twemoji from "react-twemoji";
import "./style.css";
import "./inter/inter.css";

export default () => {
  const [query, setQuery] = useState("");
  const [selection, setSelection] = useState(0);
  const [data, setData] = useState({
    items: [],
  });

  // Handle Input
  useEffect(() => {
    window.Pulsar.query(query).then((response) => setData(response));
  }, [query]);

  // Key Press
  document.onkeydown = (e) => {
    if (e.key === "Escape") {
      window.Pulsar.close();
    } else if (e.key === "ArrowUp") {
      if (selection <= 0) {
        setSelection(data.items.length - 1);
      } else {
        setSelection(selection - 1);
      }
    } else if (e.key === "ArrowDown") {
      if (selection >= data.items.length - 1) {
        setSelection(0);
      } else {
        setSelection(selection + 1);
      }
    }
  };

  // Form Submit
  const formSubmit = (e) => {
    e.preventDefault();
    action(data.items[selection]);
  };

  // Action
  const action = async (item) => {
    if (item) {
      if (item.url) await window.Pulsar.openUrl(item.url);
    }
    window.Pulsar.close();
  };

  return (
    <Twemoji>
      <form onSubmit={formSubmit}>
        <input
          onChange={(e) => setQuery(e.target.value.trim())}
          placeholder="What's up?"
          autoFocus
        />
      </form>
      {data.answer && <div className="answer">{data.answer}</div>}
      {data.items.map((item, i) => (
        <div
          className={`item ${selection === i ? "selected" : ""}`}
          key={i}
          onMouseOver={() => setSelection(i)}
          onClick={() => action(item)}
        >
          {item.text}
        </div>
      ))}
    </Twemoji>
  );
};
