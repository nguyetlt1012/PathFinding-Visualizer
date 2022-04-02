import { useEffect, useState } from "react";
import "./Node.scss";

const Node = (props) => {
  
  const {click, row, col,handleMouse,  isEnd, isStart, isVisited, isWall}= props;
  
  const nameNode = (isStart||isEnd) ? "fall" : (isWall) ? "click"  : ""; 
  return (
    
    <div
      className={`square ${nameNode} ` }
      id={`${props.row}-${props.col}`}
      onMouseEnter={()=>{
        !props.click && handleMouse(row,col,isEnd,isStart,isWall);
      }}
      
     
    ></div>
  );
};

export default Node;
