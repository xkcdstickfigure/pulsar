import React, { useEffect, createRef } from "react";

let lines = [];
const colors = [
  [35, 83, 155],
  [155, 51, 35],
  [40, 42, 189],
  [156, 55, 158],
  [237, 55, 88],
  [45, 201, 36],
  [70, 199, 132],
  [237, 167, 17],
];

export default () => {
  const canvas = createRef();

  useEffect(() => {
    if (!canvas.current) return;
    const c = canvas.current.getContext("2d");
    const { width, height } = canvas.current.getBoundingClientRect();
    canvas.current.width = width;
    canvas.current.height = height;
    c.lineWidth = 5;

    const newLine = () => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      lines.push({
        r: color[0],
        g: color[1],
        b: color[2],
        a: 1,
        s: Math.floor(Math.random() * 10) / 2 + 0.5,
        x: 0,
        y2: Math.floor(Math.random() * 100) / 100 - 0.5,
        y3: Math.floor(Math.random() * 100) / 10000 - 0.005,
      });
    };
    newLine();

    const animation = () => {
      c.clearRect(0, 0, width, height);
      lines.forEach((line, l) => {
        line.x += line.s;
        let y = height / 2;
        let y2 = line.y2;
        let y3 = line.y3;
        c.strokeStyle = `rgba(${line.r}, ${line.g}, ${line.b}, ${line.a})`;
        if (line.x > width) {
          if (line.a > 0) line.a -= 0.01;
          else return (lines[l] = null);
        }
        c.beginPath();
        c.moveTo(0, y);
        for (let i = 0; i < line.x; i++) {
          if (y < height / 2) y3 -= y2 / 1000;
          else if (y > height / 2) y3 -= y2 / 1000;
          y2 += y3;
          y += y2;
          c.lineTo(i, y);
        }
        c.stroke();
      });
      lines = lines.filter((line) => !!line);
      if (lines.length < 5 && Math.floor(Math.random() * 100) === 0) newLine();
    };

    animation();
    const interval = setInterval(animation, 10);
    return () => clearInterval(interval);
  }, [canvas]);

  return <canvas className="spectrum" ref={canvas} />;
};
