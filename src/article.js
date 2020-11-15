import React from "react";

export default ({ title, source, url, image }) => (
  <a href={url} target="_blank" rel="noopener noreferrer" className="article">
    <div
      style={{
        backgroundImage: `url('${image}')`,
      }}
    />
    <div>
      <h1 className="title">{title}</h1>
      <h2 className="source">{source}</h2>
    </div>
  </a>
);
