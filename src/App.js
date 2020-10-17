import React from "react";
import Twemoji from "react-twemoji";
import "./style.css";
import "./inter/inter.css";

export default () => {
  const input = (value) => {
    console.log(value);
  };

  const formSubmit = (e) => e.preventDefault();

  return (
    <Twemoji>
      <form onSubmit={formSubmit}>
        <input
          onChange={(e) => input(e.target.value.trim())}
          placeholder="What's up?"
          autoFocus
        />
      </form>
    </Twemoji>
  );
};
