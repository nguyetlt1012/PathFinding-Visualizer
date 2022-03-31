import { useEffect, useState } from "react";
import Node from "./Node/Node";
import "./Pathfinding.scss";
const Pathfinding = () => {
  const ROWS = 20;
  const COLUMNS = 35;
  const START = 10;
  const END = 15;

  
  const [arr, setArr] = useState([]);
  useEffect(()=>{
    const initGrid = () => {
      let grid=[];
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
    setArr(grid)
  },[])
  
 
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

  // const curret = dijstra();
  // console.log(curret);
  // useEffect(()=>{
  //   // var x= document.querySelectorAll('.click').forEach((e)=> {
  //   //   let a= e.id.split('-').map((e)=>parseInt(e));
  //   //   nodes[a[0]][a[1]]=1;

  //   // })
  //   // console.log(arr);

  // },[click])
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
    </div>
  );
};

export default Pathfinding;
