import React from "react";

export default ({ title, source, url, image }) => (
  <a href={url} target="_blank" rel="noopener noreferrer">
    <div className="article">
      <div
        style={{
          backgroundImage: `url('${image}')`,
        }}
        className="image"
      >
        <div />
      </div>
      <div className="info">
        <h1 className="title">{title}</h1>
        <h2 className="source">{source}</h2>
      </div>
    </div>
  </a>
);
