
const roads = [
  "Alice's House-Bob's House",   "Alice's House-Post Office", 
  "Daria's House-Ernie's House", "Ernie's House-Grete's House", 
  "Grete's House-Shop",          "Marketplace-Post Office", 
  "Marketplace-Town Hall",       "Alice's House-Cabin", 
  "Bob's House-Town Hall",       "Daria's House-Town Hall", 
  "Grete's House-Farm",          "Marketplace-Farm", 
  "Marketplace-Shop",            "Shop-Town Hall"
];

function buildGraph(edges) {
  let graph = Object.create(null);

  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    }
    else {
      graph[from].push(to);
    }
  }

  for (let [from, to] of edges.map(edge => edge.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads);

// convert graph representation
const {find_path} = require("dijkstrajs");

let graph = {};
for (let node of Object.keys(roadGraph)) {
  let edges = graph[node] = {};
  for (let dest of roadGraph[node]) {
    edges[dest] = 1;
  }
}

console.log(graph);
console.log("-".repeat(50));
let from = "Post Office", to = "Cabin";
console.log(`find path from '${from}' to '${to}':`);
console.log(find_path(graph, from, to));
