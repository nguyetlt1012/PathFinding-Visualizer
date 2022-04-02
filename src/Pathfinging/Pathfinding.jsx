import { useEffect, useState } from "react";
import { dijstra, getNodesInShortestPathOrder } from "./Algorithm/Dijstra";
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
  async function render () {
    const result =  await dijstra(arr,arr[START][START], arr[END][END]);
    const path = await getNodesInShortestPathOrder(arr[END][END])
    result.shift();
    const length = result.length
    result.map((node,i) =>{
      if(i===length-1) {
        setTimeout(()=>{
          animatePath(path)
        }, 13*i);
       
      }
      setTimeout(() => {
        document.getElementById(`${node.row}-${node.col}`).className="square visited"
      }, 10 * i);
      
    })
    const animatePath= (path) =>{
      for(let i=1; i< path.length; i++){
        setTimeout(()=>{
          const node = path[i];
          document.getElementById(`${node.row}-${node.col}`).className="square path"
        },70*i)
      }
    }
    
    console.log("find");
    
    console.log(path);
    
    
   }
  // useEffect( ()=>  {
    
  //  const visitedNodes =  render()
    
    
  // },[click])
  
  const handleFind = (e) =>{
    e.preventDefault();
    render()
    console.log("click button");
  }
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
      <button onClick={handleFind}>RUN</button>
    </div>
  );
};

export default Pathfinding;
