export function dijstra(arr, start, finish) {
  const a = [];
  for (let i = 0; i < 6; i++) {
    const current = [];
    for (let j = 0; j < 6; j++) {
      current.push({
        distance: 100,
        row: i,
        col: j,
      });
    }
    a.push(current);
  }
  a[2][2].distance = 0;
const current = getAllNodes(a);
sortNodesByDistance(current);
const closest = current.shift();
update(closest,a);
  return a;
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
function update( node, arr){
    const neighbors = [];
    neighbors.push(arr[2][1],arr[2][3],arr[1][2],arr[3][2]);
    for( const neighbor of neighbors){
        neighbor.distance = node.distance + 1;
    }
}
