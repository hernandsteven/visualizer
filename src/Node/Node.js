import React from "react";
import "./Node.css";

const Node = (props) => {
  const {
    row,
    col,
    isStart,
    isFinish,
    isVisited,
    isWall,
    isHovered,
    onMouseOver,
    onMouseOut,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
  } = props;
  const className = isStart
    ? "start"
    : isFinish
    ? "finish"
    : isWall
    ? "wall"
    : isVisited
    ? "visited"
    : isHovered
    ? "hovered"
    : "";
  return (
    <>
      <div
        className={`node ${className}`}
        id={`${row}-${col}`}
        onMouseOver={() => {
          onMouseOver(row, col);
        }}
        onMouseOut={() => {
          onMouseOut(row, col);
        }}
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
