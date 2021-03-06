function buildGraphObjects(array_of_two) {
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

function buildGraphArray(edges) {
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


module.exports = {
  buildGraphObjects: buildGraphObjects,
  buildGraph: buildGraphArray
}
