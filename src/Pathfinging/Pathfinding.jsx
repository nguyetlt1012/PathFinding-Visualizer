import { useEffect, useState } from "react";
import { Astar, getNodesInShortestPathOrderAstar } from "./Algorithm/Astar";
import { dijstra, getNodesInShortestPathOrder } from "./Algorithm/Dijstra";
import { Greedy } from "./Algorithm/Greedy";
import Node from "./Node/Node";
import "./Pathfinding.scss";
const Pathfinding = () => {
  const ROWS = 20;
  const COLUMNS = 35;
  const START = 10;
  const END = 15;

  const [arr, setArr] = useState([]);
  useEffect(() => {
    const initGrid = () => {
      let grid = [];
      for (let i = 0; i < ROWS; i++) {
        let row = [];
        for (let j = 0; j < COLUMNS; j++) {
          row.push({
            row: i,
            col: j,
            isWall: false,
            isVisited: false,
            previousNode: null,
            distance: Infinity,
            isStart: i === START && j === START,
            isEnd: i === END && j === END,
          });
        }
        grid.push(row);
      }
      return grid;
    };
    const grid = initGrid();
    setArr(grid);
  }, []);

  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };
  const handleMouse = (row, col, isEnd, isStart, isWall) => {
    if (!isEnd && !isStart) {
      let newArr = [...arr];
      newArr[row][col].isWall = !isWall;
      setArr(newArr);
    }
  };

  // const a=[];
  // for (let i = 0; i < 4; i++) {
  //   const current = [];
  //   for (let j = 0; j < 4; j++) {
  //     current.push({
  //       distance: 100,
  //       row: i,
  //       col: j,
  //       isVisited: false
  //     });
  //   }
  //   a.push(current);
  // }
  const resetArray = () => {
    return arr.map((row, i) =>
      row.map((node, y) => {
        let newNode = {
          ...node,
          distance: Infinity,
          previousNode: null,
          isVisited: false,
        };
        return newNode;
      })
    );
  };
  const removeCss = () => {
    const list = document.querySelectorAll(".square");

    list.forEach((e) => {
      e.classList.remove("visited");
      e.classList.remove("path");
    });
  };
  const handleClear = () => {
    const list = document.querySelectorAll(".square");

    list.forEach((e) => {
      e.classList.remove("visited");
      e.classList.remove("path");
      e.classList.remove("click");
    });
    const newArr = arr.map((row, i) =>
      row.map((node, y) => {
        let newNode = {
          ...node,
          distance: Infinity,
          previousNode: null,
          isWall: false,
          isVisited: false,
        };
        return newNode;
      })
    );
    setArr(newArr);
  };
  async function render() {
    removeCss();
    const newarr = resetArray();
    const result = await dijstra(
      newarr,
      newarr[START][START],
      newarr[END][END]
    );
    const path = await getNodesInShortestPathOrder(newarr[END][END]);
    result.shift();
    const length = result.length;
    result.map((node, i) => {
      if (i === length - 1) {
        setTimeout(() => {
          animatePath(path);
        }, 13 * i);
      }
      setTimeout(() => {
        if (i < length - 1) {
          document.getElementById(`${node.row}-${node.col}`).className =
            "square visited";
        }
      }, 10 * i);
    });
    const animatePath = (path) => {
      for (let i = 1; i < path.length - 1; i++) {
        setTimeout(() => {
          const node = path[i];
          document.getElementById(`${node.row}-${node.col}`).className =
            "square path";
        }, 70 * i);
      }
    };
    console.log(newarr[10][12], arr[10][12]);
  }
  async function astar() {
    removeCss();
    const newarr = resetArray();
    const result = await Astar(newarr, newarr[START][START], newarr[END][END]);
    const path = await getNodesInShortestPathOrderAstar(newarr[END][END]);
    result.shift();
    const length = result.length;
    result.map((node, i) => {
      if (i === length - 1) {
        setTimeout(() => {
          animatePath(path);
        }, 13 * i);
      }
      setTimeout(() => {
        if (i < length - 1) {
          document.getElementById(`${node.row}-${node.col}`).className =
            "square visited";
        }
      }, 10 * i);
    });
    const animatePath = (path) => {
      for (let i = 1; i < path.length - 1; i++) {
        setTimeout(() => {
          const node = path[i];
          document.getElementById(`${node.row}-${node.col}`).className =
            "square path";
        }, 70 * i);
      }
    };
  }
  async function greedy() {
    removeCss();
    const newarr = resetArray();
    const result = await Greedy(newarr, newarr[START][START], newarr[END][END]);
    const path = await getNodesInShortestPathOrderAstar(newarr[END][END]);
    
    result.shift();
    const length = result.length;
    result.map((node, i) => {
      if (i === length - 1) {
        setTimeout(() => {
          animatePath(path);
        }, 13 * i);
      }
      setTimeout(() => {
        if (i < length - 1) {
          document.getElementById(`${node.row}-${node.col}`).className =
            "square visited";
        }
      }, 10 * i);
    });
    const animatePath = (path) => {
      for (let i = 1; i < path.length - 1; i++) {
        setTimeout(() => {
          const node = path[i];
          document.getElementById(`${node.row}-${node.col}`).className =
            "square path";
        }, 70 * i);
      }
    };
  }
  const handleFind = (e) => {
    e.preventDefault();
    render();
    console.log("dijistra");
  };
  const handleFindA = (e) => {
    e.preventDefault();
    astar();
    console.log("astar");
  };
  const handleFindGreedy = (e) => {
    e.preventDefault();
    greedy();
    console.log("greedy best first");
  };
  return (
    <div className="board">
      <div className="nodes" onClick={handleClick}>
        {arr.map((r, i1) => {
          return r.map((c, i2) => {
            const { row, col, isEnd, isStart, isVisited, isWall } = c;
            return (
              <Node
                row={row}
                col={col}
                isEnd={isEnd}
                isStart={isStart}
                isWall={isWall}
                isVisited={isVisited}
                click={click}
                handleMouse={handleMouse}
              />
            );
          });
        })}
      </div>
      <div className="algorithmButton">
        <button onClick={handleFind}>RUN DIJISTRA</button>
        <button onClick={handleFindA}>RUN ASTAR</button>
        <button onClick={handleFindGreedy}>RUN GREEDY BEST FIRST</button>
        <button onClick={handleClear}>CLEAR ALL</button>
      </div>
    </div>
  );
};

export default Pathfinding;
