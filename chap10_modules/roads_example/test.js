const {test, equals} = require('../../utils/utils.js');
const buildGraph = require('./graph/graph.js');
const roadGraph = require('./road/road.js');

test("buildGraph", () => {
  const array_of_two = [['a','b']];
  const expected = {'a': {'b': 1}, 'b': {'a': 1}};

  console.log(buildGraph(array_of_two));
  return equals(expected, buildGraph(array_of_two));
});

test("roadGraph", () => {
  console.log(roadGraph);
  return true;
});

