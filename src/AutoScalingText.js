import React, { useState, useEffect, useRef } from "react";
import "./Calculator.css";

export function AutoScalingText(props) {
  const [scale, setScale] = useState(1);
  const node = useRef(null);

  useEffect(() => {
    const { current } = node;
    const { parentNode } = current;
    const containerWidth = parentNode.offsetWidth;
    const actualWidth = current.offsetWidth;
    const actualScale = containerWidth / actualWidth;

    if (actualScale < 1) {
      setScale(actualScale);
    } else {
      setScale(1);
    }
  });

  return (
    <div
      className="auto-scaling-text"
      style={{ transform: `scale(${scale})` }}
      ref={node}
    >
      {props.children}
    </div>
  );
}
