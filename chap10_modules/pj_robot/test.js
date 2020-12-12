const {test} = require('../../utils/utils.js');
const buildGraph = require('./graph/graph.js');

test("buildGraph", () => {
  const roads = [
    "Alice's House-Bob's House",   "Alice's House-Post Office", 
    "Daria's House-Ernie's House", "Ernie's House-Grete's House", 
    "Grete's House-Shop",          "Marketplace-Post Office", 
    "Marketplace-Town Hall",       "Alice's House-Cabin", 
    "Bob's House-Town Hall",       "Daria's House-Town Hall", 
    "Grete's House-Farm",          "Marketplace-Farm", 
    "Marketplace-Shop",            "Shop-Town Hall"
  ];

  function makeArrayOfTwo(edges) {
    let result = [];
    for (let [from, to] of edges.map(edge => edge.split("-"))) {
      result.push([from, to]);   
    }
    return result;
  };

  console.log(buildGraph(makeArrayOfTwo(roads)));

  return true;
});
