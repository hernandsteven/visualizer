import React from "react";
import "./Node.css";

const Node = ({
  row,
  col,
  isStart,
  isFinish,
  isVisited,
  isWall,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) => {
  const className = isStart
    ? "start"
    : isFinish
    ? "finish"
    : isWall
    ? "wall"
    : isVisited
    ? "visited"
    : "unvisited";
  return (
    <>
      <div
        className={`node ${className}`}
        id={`${row}-${col}`}
        onMouseDown={() => {
          onMouseDown(row, col);
        }}
        onMouseEnter={() => {
          onMouseEnter(row, col);
        }}
        onMouseUp={() => {
          onMouseUp();
        }}
      ></div>
    </>
  );
};

export default Node;
