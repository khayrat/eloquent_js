function buildGraph(array_of_two) {
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = {};
    }
    graph[from][to] = 1;
  };

  let graph = {};
  for (let [from, to] of array_of_two) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

module.exports = buildGraph
