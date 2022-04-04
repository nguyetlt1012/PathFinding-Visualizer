
export function Astar(arr, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.distance=0;
    const unvisitedNodes = getAllNodes(arr);
    while (!!unvisitedNodes.length) {
      sortNodesByDistance(unvisitedNodes);
      const closest = unvisitedNodes.shift();
      if(closest.isWall) continue;
      if (closest.distance === Infinity) return visitedNodesInOrder;
      closest.isVisited = true;
      visitedNodesInOrder.push(closest);
      if(closest=== finishNode) return visitedNodesInOrder;
      update(closest, arr,finishNode);
      
    }
    console.log("dijstra");
    
  }
  function sortNodesByDistance(a) {
    a.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  }
  
  function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  }
  function update(node, arr,finishNode) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, arr)
    
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance  +1 + dis(neighbor, finishNode);
      neighbor.previousNode = node;
    }
  }
  function dis(node1, node2){
    let x= Math.abs(node1.col-node2.col);
    let y = Math.abs(node1.row-node2.row);
    return Math.sqrt(x*x+y*y);
  }
  function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
  }
  export function getNodesInShortestPathOrderAstar(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode?.previousNode;
    }
    return nodesInShortestPathOrder;
  }