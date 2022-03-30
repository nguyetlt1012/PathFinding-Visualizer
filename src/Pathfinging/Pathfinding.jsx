import { useEffect, useState } from "react";
import Node from "./Node/Node";
import "./Pathfinding.scss";
const Pathfinding = () => {
  const ROWS = 20;
  const COLUMNS = 35;
  let nodes = Array(ROWS).fill(0);
  nodes = nodes.map((e) => Array(COLUMNS).fill(0));
  const [click, setClick] = useState(false);
  const [isFall, setIsFall] = useState(false);
  
  const handleClick = ()=>{
    setClick(!click);
  }
 
  
  useEffect(()=>{
    var x= document.querySelectorAll('.click').forEach((e)=> {
      let a= e.id.split('-').map((e)=>parseInt(e));
      nodes[a[0]][a[1]]=1;
      
    })
    console.log(nodes);
    
  },[click])
  return (
    <div className="board" >
      <div className="nodes" onClick={handleClick}>
        {nodes.map((r, i1) => {
          return r.map((c, i2) =>
          (
            <Node
              row={i1}
              col={i2}
              handleClick = {handleClick}
              click = {click}
              isFall={c}
              
              
            />
          ));
        })}
      </div>
    </div>
  );
};

export default Pathfinding;
