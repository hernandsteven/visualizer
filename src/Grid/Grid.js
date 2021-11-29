import React, { useState, useEffect } from "react";
import "./Grid.css";
import Node from "../Node/Node.js";
import { dfs } from "../Algorithims/depthFirstSearch.js";
import { bfs } from "../Algorithims/breadthFirstSearch.js";

const NUM_ROWS = 10;
const NUM_COLS = 10;
const START_ROW = 0;
const START_COL = 0;
const DEST_ROW = NUM_ROWS - 1;
const DEST_COL = NUM_COLS - 1;

const Grid = () => {
  const [gridState, setGridState] = useState([]);
  const [mouseIsPressed, setMousePressed] = useState(false);

  /* Init grid before dom loads */
  useEffect(() => {
    setGridState(initGrid(NUM_ROWS, NUM_COLS));
  }, []);

  const handleDFS = () => {
    let list = dfs(
      gridState.slice(),
      START_ROW,
      START_COL,
      NUM_ROWS,
      NUM_COLS,
      []
    );

    for (let i = 0; i < list.length; i++) {
      setTimeout(() => {
        const [row, col] = list[i];

        document.getElementById(`${row}-${col}`).className = "node visited";
      }, 35 * i);
    }
  };

  const handleBFS = () => {
    let list = bfs(
      gridState.slice(),
      START_ROW,
      START_COL,
      NUM_ROWS,
      NUM_COLS,
      []
    );

    for (let i = 0; i < list.length; i++) {
      setTimeout(() => {
        const [row, col] = list[i];

        document.getElementById(`${row}-${col}`).className = "node visited";
      }, 35 * i);
    }
  };

  const handleClearWalls = (grid) => {
    let newGrid = grid.slice();
    for (let row = 0; row < NUM_ROWS; row++) {
      for (let col = 0; col < NUM_COLS; col++) {
        let node = grid[row][col];

        if (node.isWall) {
          const newNode = {
            ...node,
            isWall: !node.isWall,
          };
          newGrid[row][col] = newNode;
        }
      }
    }
    setGridState(newGrid);
  };
  const handleMouseOver = (row, col) => {
    setGridState(setHighlightNode(gridState, row, col));
  };
  const handleMouseOut = (row, col) => {
    setGridState(unhighlight(gridState, row, col));
  };
  const handleMouseDown = (row, col) => {
    setMousePressed(true);
    const setWallGrid = setWall(gridState, row, col);
    if (setWallGrid !== null) {
      setGridState(setWallGrid);
    }
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const setWallGrid = setWall(gridState, row, col);
    if (setWallGrid !== null) {
      setGridState(setWallGrid);
    }
  };

  const handleMouseUp = () => {
    setMousePressed(false);
  };

  return (
    <>
      <button
        onClick={() => {
          handleDFS(gridState);
        }}
      >
        RUN DFS
      </button>
      <button
        onClick={() => {
          handleBFS(gridState);
        }}
      >
        RUN BFS
      </button>
      <button
        onClick={() => {
          handleClearWalls(gridState);
        }}
      >
        CLEAR WALLS
      </button>
      <div className="parent">
        <div className="grid">
          {gridState.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {
                    row,
                    col,
                    isStart,
                    isFinish,
                    isWall,
                    isVisited,
                    isHovered,
                  } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      row={row}
                      col={col}
                      isStart={isStart}
                      isFinish={isFinish}
                      isWall={isWall}
                      isVisited={isVisited}
                      isHovered={isHovered}
                      mouseIsPressed={mouseIsPressed}
                      onMouseOver={() => handleMouseOver(row, col)}
                      onMouseOut={() => handleMouseOut(row, col)}
                      onMouseDown={() => handleMouseDown(row, col)}
                      onMouseEnter={() => handleMouseEnter(row, col)}
                      onMouseUp={() => handleMouseUp()}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

const initGrid = (num_rows, num_cols) => {
  let grid = [];

  for (let row = 0; row < num_rows; row++) {
    let currRow = [];
    for (let col = 0; col < num_cols; col++) {
      currRow.push(createNode(row, col));
    }
    grid.push(currRow);
  }
  return grid;
};

const createNode = (row, col) => {
  return {
    row,
    col,
    isStart: row === START_ROW && col === START_COL,
    isFinish: row === DEST_ROW && col === DEST_COL,
    isVisited: false,
    isWall: false,
  };
};

const setWall = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  //newGrid[row][col] = { ...node, isWall: false };
  if (node.isVisited) return null;
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const setHighlightNode = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  newGrid[row][col] = { ...node, isHovered: true };
  return newGrid;
};

const unhighlight = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  newGrid[row][col] = { ...node, isHovered: false };
  return newGrid;
};

export default Grid;
