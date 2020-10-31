import React, { useState, useEffect } from "react";
import Twemoji from "react-twemoji";
import "./style.css";
import "./inter/inter.css";
import { generate as randomString } from "randomstring";
import Spectrum from "./spectrum";

const emptyResponse = {
  items: [],
};
let queryId;

export default () => {
  const [data, setData] = useState();
  const [query, setQuery] = useState("");
  const [selection, setSelection] = useState(0);
  const [response, setResponse] = useState(emptyResponse);
  const results = response.answer || response.items.length > 0;

  // Set Data
  useEffect(() => {
    const set = () => setData(window.Pulsar.data);
    set();
    const interval = setInterval(set, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle Input
  useEffect(() => {
    if (query) {
      queryId = randomString(32);
      window.Pulsar.query(queryId, query).then((response) => {
        if (query && queryId === response.id) setResponse(response);
      });
    } else setResponse(emptyResponse);
  }, [query]);

  // Key Press
  document.onkeydown = (e) => {
    if (e.key === "Escape") {
      window.Pulsar.close();
    } else if (e.key === "ArrowUp") {
      if (selection <= 0) {
        setSelection(response.items.length - 1);
      } else {
        setSelection(selection - 1);
      }
    } else if (e.key === "ArrowDown") {
      if (selection >= response.items.length - 1) {
        setSelection(0);
      } else {
        setSelection(selection + 1);
      }
    }
  };

  // Form Submit
  const formSubmit = (e) => {
    e.preventDefault();
    action(response.items[selection]);
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
          placeholder={data && !data.err ? data.greeting : "What's up?"}
          autoFocus
        />
      </form>

      {!results && <Spectrum />}
      {response.answer && <div className="answer">{response.answer}</div>}
      {response.items.map((item, i) => (
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
