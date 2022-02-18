import React, { useState, useEffect } from "react";
import "./Grid.css";
import Node from "../Node/Node.js";
import { dfs } from "../Algorithims/depthFirstSearch.js";
import { bfs } from "../Algorithims/breadthFirstSearch.js";

const NUM_ROWS = 10;
const NUM_COLS = 10;
let START_ROW = 0;
let START_COL = 0;
const DEST_ROW = 0;
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
      [...gridState],
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
      }, 20 * i);
    }

    //console.log("nodes traveled", list.length);
  };

  const handleBFS = () => {
    let list = bfs(
      [...gridState],
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
      }, 20 * i);
    }
  };

  const handleClearWalls = (grid) => {
    let newGrid = [...grid];
    for (let row = 0; row < NUM_ROWS; row++) {
      for (let col = 0; col < NUM_COLS; col++) {
        let node = grid[row][col];

        if (node.isWall) {
          newGrid[row][col] = { ...node, isWall: !node.isWall };
        }
      }
    }
    setGridState(newGrid);
  };

  const handleMouseDown = (row, col) => {
    const setWallGrid = setWall(gridState, row, col);

    if (setWallGrid !== null) {
      setMousePressed(true);
      setTimeout(() => {
        setGridState(setWallGrid);
      }, 100);
    }
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const setWallGrid = setWall(gridState, row, col);
    if (setWallGrid !== null) {
      setTimeout(() => {
        setGridState(setWallGrid);
      }, 100);
    }
  };

  const handleMouseUp = () => {
    setMousePressed(false);
  };

  const handleReset = () => {
    window.location.reload();
  };
  return (
    <>
      <button
        className="button-19"
        onClick={() => {
          handleDFS(gridState);
        }}
      >
        RUN DFS
      </button>
      <button
        className="button-19"
        onClick={() => {
          handleClearWalls(gridState);
        }}
      >
        CLEAR WALLS
      </button>
      <button
        className="button-19"
        onClick={() => {
          handleReset();
        }}
      >
        Reset
      </button>
      <div className="parent">
        <div className="grid" onMouseUp={() => handleMouseUp()}>
          {gridState.map((row, rowIdx) => {
            return (
              <div className="row" key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isStart, isFinish, isWall, isVisited } =
                    node;
                  return (
                    <Node
                      key={nodeIdx}
                      row={row}
                      col={col}
                      isStart={isStart}
                      isFinish={isFinish}
                      isWall={isWall}
                      isVisited={isVisited}
                      mouseIsPressed={mouseIsPressed}
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
  const newGrid = [...grid];
  const node = newGrid[row][col];
  if (node.isVisited || node.isStart || node.isFinish) return null;
  newGrid[row][col] = { ...node, isWall: !node.isWall };
  return newGrid;
};

export default Grid;
