import React, { useState } from "react";
import Twemoji from "react-twemoji";
import "./style.css";
import "./inter/inter.css";

export default () => {
  const [query, setQuery] = useState("");
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
      {query.length > 3 && <p>test</p>}
    </Twemoji>
  );
};
