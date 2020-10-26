import React, { useState, useEffect } from "react";
import Twemoji from "react-twemoji";
import "./style.css";
import "./inter/inter.css";
import { generate as randomString } from "randomstring";
import Spectrum from "./spectrum";

const emptyData = {
  items: [],
};
let queryId;

export default () => {
  const [query, setQuery] = useState("");
  const [selection, setSelection] = useState(0);
  const [data, setData] = useState(emptyData);
  const results = data.answer || data.items.length > 0;

  // Handle Input
  useEffect(() => {
    if (query) {
      queryId = randomString(32);
      window.Pulsar.query(queryId, query).then((response) => {
        if (query && queryId === response.id) setData(response);
      });
    } else setData(emptyData);
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

      {!results && <Spectrum />}
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

      <style>{window.Pulsar.theme}</style>
    </Twemoji>
  );
};
