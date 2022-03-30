import { useEffect, useState } from "react";
import "./Node.scss";

const Node = (props) => {
  const [hover, setHover]=useState(false);
  const {click, row, col, isFall}= props;
  const handleMouseEnter =()=>{
        setHover(!hover);
        
  }
  
  return (
    
    <div
      className={`square ${hover && "click"} ` }
      id={`${props.row}-${props.col}`}
      onMouseEnter={()=>{
        !props.click && handleMouseEnter() 
      }}
      
     
    ></div>
  );
};

export default Node;
